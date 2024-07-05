"""
The User Service provides access to the User model and its associated database operations.
"""

from fastapi import Depends
from sqlalchemy import select, String, cast
from sqlalchemy.orm import Session

from ..models.user import User
from ..database import db_session
from ..entities.user_entity import UserEntity

class UserService:
    _session: Session

    def __init__(
            self,
            session: Session = Depends(db_session),
    ):
        """Initialize User Service."""
        self._session = session


    def all(self) -> list[User]:
        """
        Retrieves all users from the user table

        Returns:
            list[User]: List of all `User`
        """
        # Select all entries in `User` table
        query = select(UserEntity)
        entities = self._session.scalars(query).all()

        # Convert entries to a model and return
        return [entity.to_model() for entity in entities]
    
    def get(self, username: str) -> User | None:
        """
        Get a User by username.

        Args:
            username: The username of the user.

        Returns:
            User | None: The user model or None if not found.
        """
        query = select(UserEntity).where(UserEntity.username == username)
        user_entity: UserEntity | None = self._session.scalar(query)
        if user_entity is None:
            return None
        user = user_entity.to_model()
        return user
    
    def create(self, user: User) -> User:
        """Create a User.

        If the subject is not the user, the subject must have the `user.create` permission.

        Args:
            subject: The user performing the action.
            user: The user to create.

        Returns:
            The created User.

        Raises:
            PermissionError: If the subject does not have permission to create the user.
        """
        # if subject != user:
        #     self._permission.enforce(subject, "user.create", "user/")
        entity = UserEntity.from_model(user)
        self._session.add(entity)
        self._session.commit()
        return entity.to_model()
