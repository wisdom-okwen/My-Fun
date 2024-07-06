from pydantic import BaseModel

class User(BaseModel):
    """
    Pydantic model to represent a registered user
    """
    
    id: int | None = None
    first_name: str = ''
    last_name: str = ''
    username: str = ''
    email: str = ''
    bio: str | None = None
    pronouns: str | None = None
    phone: str | None = None
    password: str = ''
