"""User operations open to registered users such as searching for fellow user profiles."""
from fastapi import APIRouter, Depends
from ..services.user import UserService
from ..models import User

api = APIRouter(prefix='/api/user')
openapi_tags = {
    "name": "Users",
    "description": "User profile search and related operations."
}

@api.get('', response_model=list[User], tags=["Users"])
def get_user(
    user_service: UserService = Depends()
) -> list[User]:
    """
    Get all users

    Parameters:
        user_service: a valid UserService

    Returns:
        list[User]: All `Announcement`s in the `Announcement` database table
    """
    # Return all users
    return user_service.all()