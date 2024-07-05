"""Tests for the UserService class."""

import pytest
from backend.entities.user_entity import UserEntity

# from backend.models.permission import Permission

# Tested Dependencies
from ...models.user import User
# from ...models.pagination import PaginationParams
from ...services import UserService
# from ...services.exceptions import ResourceNotFoundException

# Data Setup and Injected Service Fixtures
# from .core_data import setup_insert_data_fixture
from .fixtures import user_svc, user_svc_integration

# Data Models for Fake Data Inserted in Setup
from .user_data import evan, harry
from . import user_data
# from .permission_data import (
#     ambassador_permission,
#     ambassador_permission_coworking_reservation,
# )


def test_get_all(user_svc_integration: UserService):
    """Test that a user can be retrieved by PID."""
    users = user_svc_integration.all()
    assert users is not None
    assert len(users) == 2
   
