from sqlalchemy import Boolean, Integer, String
from sqlalchemy.orm import mapped_column, Mapped, relationship
from typing import Self

from backend.models.user import User

from .entity_base import EntityBase

class UserEntity(EntityBase):
    """Data schema that defines the shape of the User table."""

    # Name of user table in PostgreSQL db
    __tablename__ = "user"

    # Unique identifier for user entity
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    # First name of user
    first_name: Mapped[str] = mapped_column(String(64), nullable=False, default="")
    # Last name of user
    last_name: Mapped[str] = mapped_column(String(64), nullable=False, default="")
    # User name which also represents myfun handle
    username: Mapped[str] = mapped_column(String(64), unique=True, nullable=False, default="")
    # User's unique email address
    email: Mapped[str] = mapped_column(String(64), unique=True, nullable=False, default="")
    # User's bio info
    bio: Mapped[str] = mapped_column(String(64), nullable=True)
    # User's pronouns
    pronouns: Mapped[str] = mapped_column(String(64))
    # User's phone number
    phone: Mapped[int] = mapped_column(String(64), unique=True, nullable=True)
    # User's current password
    password: Mapped[str] = mapped_column(String(64), nullable=False, default="")

    @classmethod
    def from_model(cls, model: User) -> Self:
        """
        Create a UserEntity from a User model.

        Args:
            model (User): The model to create a user entity from

        Returns:
            Self: The user entity
        """
        return cls(
            id=model.id,
            first_name=model.first_name,
            last_name=model.last_name,
            username=model.username,
            email=model.email,
            bio=model.bio,
            pronouns=model.pronouns,
            phone=model.phone,
            password=model.password
        )

    def to_model(self) -> User:
        """
        Create a User model from a UserEntity.

        Returns:
            User: A User model for API usage.
        """
        return User(
            id=self.id,
            first_name=self.first_name,
            last_name=self.last_name,
            username=self.username,
            email=self.email,
            bio=self.bio,
            pronouns=self.pronouns,
            phone=self.phone,
            password=self.password
        )

    def update(self, model: User) -> None:
        """
        Update a UserEntity from a User model.

        Args:
            model (User): The model to create a user entity from

        Returns:
            Self: The user entity
        """
        self.last_name=model.last_name
        self.first_name=model.first_name
        self.username=model.username
        self.email=model.email
        self.bio=model.bio
        self.pronouns=model.pronouns
        self.phone=model.phone
        self.password=model.password