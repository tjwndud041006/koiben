# Koiben API

FastAPI backend for Koiben game with MongoDB Atlas.

## Environment Variables

Set these in Render Dashboard:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `DATABASE_NAME` | Database name (default: koiben) |

## Local Development

```bash
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8001
```

## API Endpoints

- `POST /users` - Login/Register
- `PUT /users/{name}` - Update progress
- `GET /rankings` - Get rankings
- `POST /rankings` - Submit ranking
