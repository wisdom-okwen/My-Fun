"""
The User Service provides access to the User model and its associated database operations.
"""

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models.user import User
from ..database import db_session
from ..entities.user_entity import UserEntity
from .exceptions import ResourceNotFoundException, UserPermissionException

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
    
    
    def update(self, user: User) -> User:
        """
        Update the user 
        If none found with that username, a debug description is displayed.

        Parameters:
            user: a valid User model representing the currently logged in User

        Returns:
            User: Updated user object

        Raises:
            ResourceNotFoundException: If no user is found with the corresponding username
        """

        # Admin needs to be able to update a leader's user because approving or denying involves updating its state
        # if subject.id != user.author_id:
        #     self._permission.enforce(
        #         subject, "user.update", f"user/{user.slug}"
            # )

        # Query the user with matching username
        obj = self._session.get(UserEntity, user.id)

        # Check if result is null
        if obj is None:
            raise ResourceNotFoundException(
                f"No user found with matching username: {user.username}"
            )

        # Update user object
        obj.id=user.id
        obj.last_name=user.last_name
        obj.first_name=user.first_name
        obj.username=user.username
        obj.bio=user.bio
        obj.phone=user.phone
        obj.password=user.password
        obj.pronouns=user.pronouns
        obj.phone=user.phone
        obj.email=user.email

        # Save changes
        self._session.commit()

        # Return updated object
        return obj.to_model()
    

    def delete(self, username: str) -> None:
        """
        Delete the user based on the provided username.
        If no item exists to delete, a debug description is displayed.

        Parameters:
            subject: a valid User model representing the currently logged in User
            username: a string representing a unique user username

        Raises:
            ResourceNotFoundException: If no user is found with the corresponding username
        """

        # Find object to delete
        obj = (
            self._session.query(UserEntity)
            .filter(UserEntity.username == username)
            .one_or_none()
        )

        # Ensure object exists
        if obj is None:
            raise ResourceNotFoundException(
                f"No user found with matching username: {username}"
            )

        # if subject.id != obj.author_id:
        #     self._permission.enforce(
        #         subject, "user.delete", f"user/{username}"
        #     )

        # Delete object and commit
        self._session.delete(obj)
        # Save changes
        self._session.commit()

