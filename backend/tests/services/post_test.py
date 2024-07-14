"""Tests for the PostService class."""

from unittest.mock import create_autospec
import pytest

from backend.services.exceptions import (
    UserPermissionException,
    ResourceNotFoundException,
)

from ...models import Post
from ...services.post import PostService
from .fixtures import post_svc_integration
from .core_data import setup_insert_data_fixture
from post_data import posts

# from .announcement_test_data import (
#     announcements,
#     bit_news,
#     cads_news,
#     to_add,
#     updated_announcement,
#     create_by_leader,
#     fake_announcement,
# )
# from ..user_data import root, user, leader

# from ....models.announcement import State

# Test Functions
def test_get_announcements(post_svc_integration: PostService):
    """Test that retrieving announcements retrieves all announcements."""
    retrieved_posts = post_svc_integration.all()
    assert retrieved_posts is not None
    assert len(retrieved_posts) == len(posts)
    assert retrieved_posts[0].author_id == retrieved_posts[0].author_id
    assert retrieved_posts[1].id == retrieved_posts[1].id
