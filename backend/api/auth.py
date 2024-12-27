from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt

from ..database import db_session
from ..services.user import UserService
from ..models.user import User
from ..models.token import Token
from ..utility.security import verify_password

SECRET_KEY = "YOUR_SUPER_SECRET_KEY"  # Use environment variable or secrets manager
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

api = APIRouter(prefix="/api/auth", tags=["Auth"])

@api.post("/login", response_model=Token)
def login(username: str, password: str, user_service: UserService = Depends()):
    user = user_service.get(username)  # Retrieve user by username
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(password, user.password or ""):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Create JWT
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    return Token(access_token=access_token)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(datetime.timezone.utc) + expires_delta
    else:
        expire = datetime.now(datetime.timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
