from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from datetime import datetime
from bson import ObjectId

from database import connect_to_mongo, close_mongo_connection, get_database
from models import UserCreate, UserUpdate, UserResponse, RankingCreate, RankingResponse, Affection

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(title="Koiben API", lifespan=lifespan)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============== 사용자 API ===============

@app.post("/users", response_model=UserResponse)
async def login_or_create_user(user: UserCreate):
    """이름으로 로그인 또는 신규 사용자 생성"""
    db = get_database()
    
    # 기존 사용자 확인
    existing_user = await db.users.find_one({"name": user.name})
    
    if existing_user:
        # 기존 사용자 반환
        return UserResponse(
            name=existing_user["name"],
            currentStage=existing_user.get("currentStage", 0),
            unlockedStage=existing_user.get("unlockedStage", 0),
            affection=Affection(**existing_user.get("affection", {})),
            learnedWords=existing_user.get("learnedWords", []),
            energy=existing_user.get("energy", 5),
            createdAt=existing_user.get("createdAt"),
            updatedAt=existing_user.get("updatedAt"),
            isNew=False
        )
    
    # 신규 사용자 생성
    new_user = {
        "name": user.name,
        "currentStage": 0,
        "unlockedStage": 0,
        "affection": {"girl1": 0, "girl2": 0, "girl3": 0},
        "learnedWords": [],
        "energy": 5,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    await db.users.insert_one(new_user)
    
    return UserResponse(
        name=new_user["name"],
        currentStage=new_user["currentStage"],
        unlockedStage=new_user["unlockedStage"],
        affection=Affection(**new_user["affection"]),
        learnedWords=new_user["learnedWords"],
        energy=new_user["energy"],
        createdAt=new_user["createdAt"],
        isNew=True
    )

@app.get("/users/{name}", response_model=UserResponse)
async def get_user(name: str):
    """사용자 데이터 조회"""
    db = get_database()
    user = await db.users.find_one({"name": name})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(
        name=user["name"],
        currentStage=user.get("currentStage", 0),
        unlockedStage=user.get("unlockedStage", 0),
        affection=Affection(**user.get("affection", {})),
        learnedWords=user.get("learnedWords", []),
        energy=user.get("energy", 5),
        createdAt=user.get("createdAt"),
        updatedAt=user.get("updatedAt")
    )

@app.put("/users/{name}", response_model=UserResponse)
async def update_user(name: str, update: UserUpdate):
    """사용자 진행 상황 업데이트"""
    db = get_database()
    
    update_data = {"updatedAt": datetime.utcnow()}
    
    if update.currentStage is not None:
        update_data["currentStage"] = update.currentStage
    if update.unlockedStage is not None:
        update_data["unlockedStage"] = update.unlockedStage
    if update.affection is not None:
        update_data["affection"] = update.affection.model_dump()
    if update.learnedWords is not None:
        update_data["learnedWords"] = update.learnedWords
    if update.energy is not None:
        update_data["energy"] = update.energy
    
    result = await db.users.update_one(
        {"name": name},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    # 업데이트된 사용자 반환
    user = await db.users.find_one({"name": name})
    return UserResponse(
        name=user["name"],
        currentStage=user.get("currentStage", 0),
        unlockedStage=user.get("unlockedStage", 0),
        affection=Affection(**user.get("affection", {})),
        learnedWords=user.get("learnedWords", []),
        energy=user.get("energy", 5),
        createdAt=user.get("createdAt"),
        updatedAt=user.get("updatedAt")
    )

# =============== 랭킹 API ===============

@app.get("/rankings", response_model=list[RankingResponse])
async def get_rankings(limit: int = 100):
    """TOP 100 랭킹 조회"""
    db = get_database()
    
    cursor = db.rankings.find().sort("score", -1).limit(limit)
    rankings = await cursor.to_list(length=limit)
    
    return [
        RankingResponse(
            id=str(r["_id"]),
            name=r["name"],
            score=r["score"],
            girl1=r.get("girl1", 0),
            girl2=r.get("girl2", 0),
            girl3=r.get("girl3", 0),
            timestamp=r.get("timestamp")
        )
        for r in rankings
    ]

@app.post("/rankings", response_model=RankingResponse)
async def create_ranking(ranking: RankingCreate):
    """랭킹 등록"""
    db = get_database()
    
    new_ranking = {
        "name": ranking.name,
        "score": ranking.score,
        "girl1": ranking.girl1,
        "girl2": ranking.girl2,
        "girl3": ranking.girl3,
        "selectedEnding": ranking.selectedEnding,
        "isSadEnding": ranking.isSadEnding,
        "timestamp": datetime.utcnow()
    }
    
    result = await db.rankings.insert_one(new_ranking)
    
    return RankingResponse(
        id=str(result.inserted_id),
        name=new_ranking["name"],
        score=new_ranking["score"],
        girl1=new_ranking["girl1"],
        girl2=new_ranking["girl2"],
        girl3=new_ranking["girl3"],
        timestamp=new_ranking["timestamp"]
    )

# =============== 헬스 체크 ===============

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "Koiben API is running"}
