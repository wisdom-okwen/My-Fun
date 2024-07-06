"""User operations open to registered users such as searching for fellow user profiles."""
from fastapi import APIRouter, Depends
from ..services.user import UserService
from ..models import User

api = APIRouter(prefix='/api/users')
openapi_tags = {
    "name": "Users",
    "description": "User profile search and related operations."
}

@api.get('', response_model=list[User], tags=["Users"])
def get_users(
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


@api.get(
    "/{user_name}",
    responses={404: {"model": None}},
    response_model=User,
    tags=["Users"],
)
def get_by_username(
    username: str, user_service: UserService = Depends()
) -> User:
    """
    Get user with matching username

    Parameters:
        username: a string representing a unique identifier for an User
        user_service: a valid UserService

    Returns:
        User: User with matching username

    Raises:
        HTTPException 404 if get_by_username() raises an Exception
    """
    return user_service.get(username)


@api.post("", response_model=User, tags=["Users"])
def new_user(
    user: User,
    user_service: UserService = Depends(),
) -> User:
    """
    Create user

    Parameters:
        user: a valid User model
        subject: a valid User model representing the currently logged in User
        user_service: a valid UserService

    Returns:
        User: Created user

    Raises:
        HTTPException 422 if create() raises an Exception
    """
    return user_service.create(user)


@api.put('', response_model=User, tags=['Users'])
def update_user(
    user: User,
    user_service: UserService = Depends()
) -> User:
    """
    Update user

    Params:
        user: a valid user model
    
    Returns:
        User: Updated user model
    """
    return user_service.update(user)
    


@api.delete("/{username}", response_model=None, tags=["Users"])
def delete_user(
    username: str,
    user_service: UserService = Depends(),
):
    """
    Delete user based on username

    Parameters:
        username: a string representing a unique identifier for an User
        subject: a valid User model representing the currently logged in User
        user_service: a valid UserService

    Raises:
        HTTPException 404 if delete() raises an Exception
    """
    user_service.delete(username)