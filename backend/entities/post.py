from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import mapped_column, Mapped, relationship
from typing import Self

from backend.models.post import Post

from .entity_base import EntityBase

class PostEntity(EntityBase):
    """Data schema that defines the shape of the Post table."""

    # Name of post table in PostgreSQL db
    __tablename__ = "post"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    description: Mapped[str] = mapped_column(Text, nullable=True, default="")
    author_id: Mapped[int] = mapped_column(Integer, nullable=False)
    state: Mapped[int] = mapped_column(Integer, nullable=False)
    image_url: Mapped[str] = mapped_column(Text, nullable=True)
    date: Mapped[str] = mapped_column(Text, nullable=False)
    time: Mapped[str] = mapped_column(Text, nullable=False)
    num_likes: Mapped[int] = mapped_column(Integer, nullable=True)


    @classmethod
    def from_model(cls, model: Post) -> Self:
        """
        Create a PostEntity from a Post model.

        Args:
            model (Post): The model to create a post entity from

        Returns:
            Self: The post entity
        """
        return cls(
            id=model.id,
            description=model.description,
            author_id=model.author_id,
            state=model.state,
            image_url=model.image_url,
            date=model.date,
            time=model.time,
            num_likes=model.num_likes
        )

    def to_model(self) -> Post:
        """
        Create a Post model from a PostEntity.

        Returns:
            Post: A Post model for API usage.
        """
        return Post(
            id=self.id,
            description=self.description,
            author_id=self.author_id,
            state=self.state,
            image_url=self.image_url,
            date=self.date,
            time=self.time,
            num_likes=self.num_likes
        )
