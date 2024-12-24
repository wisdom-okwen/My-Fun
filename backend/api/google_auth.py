from fastapi import APIRouter, HTTPException, Depends
from google.oauth2 import id_token
from google.auth.transport import requests
from sqlalchemy.orm import Session
from ..database import db_session
from ..entities.user_entity import UserEntity
from ..models.user import User
from ..env import getenv

api = APIRouter(prefix='/api/auth', tags=["Auth"])
openapi_tags = {
    "name": "Auth",
    "description": "Authentication operations using Google OAuth."
}

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
