"""
The Post Service provides access to the Post model and its associated database operations.
"""

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models.post import Post
from ..database import db_session
from ..entities.post import PostEntity
from .exceptions import ResourceNotFoundException

class PostService:
    _session: Session

    def __init__(
            self,
            session: Session = Depends(db_session)
    ):
        """Initialize Post service."""
        self._session = session

    def all(self) -> list[Post]:
        """
        Retrieve all posts from the post table.
        """
        query = select(PostEntity)
        entities = self._session.scalars(query).all()
        
        return [entity.to_model() for entity in entities]
    
    def get(self, id: int) -> Post:
        """Get a post by its id."""
        query = select(PostEntity).where(PostEntity.id == id)
        entity: PostEntity | None = self._session.get(query)
        if not entity:
            return None
        return entity.to_model()
    
    def create(self, post: Post) -> Post:
        """Create a new post."""
        entity = PostEntity.from_model(post)
        self._session.add(entity)
        self._session.commit()
        return entity.to_model()
    
    def update(self, post: Post) -> Post:
        """Update an existing post."""
        entity = self._session.get(PostEntity, post.id)
        if entity is None:
            raise ResourceNotFoundException(
                f'No post found with id: {post.id}'
            )

        entity.author_id = post.author_id
        entity.date = post.id
        entity.description = post.description
        entity.time = post.time
        entity.state = post.state
        entity.image_url = post.image_url
        entity.num_likes = post.num_likes

        self._session.commit()

        return entity.to_model()

    def delete(self, id: int) -> None:
        """Delete a post by id."""
        entity = self._session.query(PostEntity).filter(PostEntity.id == id).one_or_none()

        if entity is None:
            raise ResourceNotFoundException(
                f'No post found with matching id: {id}'
            )
    
        self._session.delete(entity)
        self._session.commit()