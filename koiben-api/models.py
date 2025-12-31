from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Affection(BaseModel):
    girl1: int = 0
    girl2: int = 0
    girl3: int = 0

class UserBase(BaseModel):
    name: str

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    currentStage: Optional[int] = None
    unlockedStage: Optional[int] = None
    affection: Optional[Affection] = None
    learnedWords: Optional[List[str]] = None
    energy: Optional[int] = None

class UserResponse(BaseModel):
    name: str
    currentStage: int = 0
    unlockedStage: int = 0
    affection: Affection = Affection()
    learnedWords: List[str] = []
    energy: int = 5
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None
    isNew: bool = False

class RankingCreate(BaseModel):
    name: str
    score: int
    girl1: int = 0
    girl2: int = 0
    girl3: int = 0
    selectedEnding: Optional[str] = None
    isSadEnding: Optional[bool] = None

class RankingResponse(BaseModel):
    id: str
    name: str
    score: int
    girl1: int = 0
    girl2: int = 0
    girl3: int = 0
    timestamp: Optional[datetime] = None
