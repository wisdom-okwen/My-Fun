"""Fixtures used for testing the core services."""

import pytest
from unittest.mock import create_autospec
from sqlalchemy.orm import Session
from ...services import (
    # PermissionService,
    UserService,
    PostService,
    # RoleService,
    # OrganizationService,
    # EventService,
    # RoomService,
)
# from ...services.announcement import AnnouncementService

# @pytest.fixture()
# def permission_svc(session: Session):
#     return PermissionService(session)


# @pytest.fixture()
# def permission_svc_mock():
#     """This mocks the PermissionService class to avoid testing its implementation here."""
#     return create_autospec(PermissionService)


@pytest.fixture()
def user_svc(session: Session):
    """This fixture is used to test the UserService class."""
    return UserService(session)


@pytest.fixture()
def user_svc_integration(session: Session):
    """This fixture is used to test the UserService class."""
    return UserService(session)


@pytest.fixture()
def post_svc(session: Session):
    """This fixture is used to test the PostService class."""
    return PostService(session)


@pytest.fixture()
def post_svc_integration(session: Session):
    """This fixture is used to test the PostService class."""
    return PostService(session)
