from fastapi import APIRouter, HTTPException, Depends
from google.oauth2 import id_token
from google.auth.transport import requests
from sqlalchemy.orm import Session
from ..database import db_session
from ..entities.user_entity import UserEntity
from ..models.user import User
from ..env import getenv

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

api = APIRouter(prefix='/api/auth', tags=["Auth"])
openapi_tags = {
    "name": "Auth",
    "description": "Authentication operations using Google OAuth."
}


SECRET_KEY = "YOUR_SUPER_SECRET_KEY"  # Use environment variable or secrets manager
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
GOOGLE_CLIENT_ID = getenv("GOOGLE_CLIENT_ID")

@api.post('/google', response_model=User, tags=["Auth"])
async def google_login(
    token: str,
    db: Session = Depends(db_session)
) -> User:
    """
    Log in using Google OAuth.

    Args:
        token (str): Google ID token.
        db (Session): SQLAlchemy session.

    Returns:
        User: User object for the authenticated user.
    """
    try:
        # Verify the Google ID token
        id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        email = id_info.get("email")
        name = id_info.get("name")

        if not email or not name:
            raise HTTPException(status_code=400, detail="Google token does not contain required information")

        # Check if the user exists
        user = db.query(UserEntity).filter(UserEntity.email == email).first()

        if not user:
            # Create a new user if one does not exist
            user = UserEntity(
                first_name=name.split()[0],
                last_name=name.split()[-1],
                username=email.split("@")[0],
                email=email,
                bio="",
                pronouns="",
                phone=None,
                password=None
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        # Convert the user entity to a user model for response
        return user.to_model()

    except ValueError as e:
        # Handle invalid Google token errors
        raise HTTPException(status_code=400, detail="Invalid Google token") from e

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
