"""User operations open to registered users such as searching for fellow user profiles."""
from fastapi import APIRouter, Depends
from ..services.user import UserService
from ..models import User

api = APIRouter(prefix='/api/user')
openapi_tags = {
    "name": "Users",
    "description": "User profile search and related operations."
}

@api.get('', response_model=list[User], tags=["User"])
def get_user(
    user_service: UserService = Depends()
) -> list[User]:
    """
    Get all users

    Parameters:
        user_service: a valid UserService

    Returns:
        list[User]: All `User`s in the `User` database table
    """
    # Return all users
    return user_service.all()


@api.post("", response_model=User, tags=["User"])
def new_announcement(
    user: User,
    user_service: UserService = Depends(),
) -> User:
    """
    Create announcement

    Parameters:
        announcement: a valid Announcement model
        subject: a valid User model representing the currently logged in User
        announcement_service: a valid AnnouncementService

    Returns:
        Announcement: Created announcement

    Raises:
        HTTPException 422 if create() raises an Exception
    """
    return user_service.create(user)