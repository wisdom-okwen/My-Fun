"""
Package module that surfaces all entities in the application.

This module serves two purposes:

1.  Loads all entities into the application derived from `entities.EntityBase`. In doing so,
    many of SQLAlchemy's features around metadata (creation/updating/dropping of tables)
    are possible by virtue of importing from this file directly.
    
2.  An index module of all entities which makes importing entities easier. Rather than importing
    from the modules directly, you can import them from the entities `package`, e.g. `from entities import UserEntity`.
    
When adding a new entity to the application be sure to import it here. As a reminder, all identifiers 
global to a module are available for import from other modules.
"""
from .entity_base import EntityBase
from .user_entity import UserEntity
from .post import PostEntity