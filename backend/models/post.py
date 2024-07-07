from pydantic import BaseModel
from enum import Enum

class State(Enum):
    DRAFT = 1
    PUBLISHED = 2
    ARCHIVED = 3
    PENDING = 4
    DENIED = 5


class Post(BaseModel):
    """
    Pydantic model to represent a `Post`.

    This model is based on the `PostEntity`, which defines the shape
    of the `Post` database in the PostgreSQL database.
    """

    id: int | None = None
    description: str | None = None
    author_id: int
    state: int
    image_url: str | None
    date: str
    time: str
    num_likes: int
