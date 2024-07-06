"""
Mock data for users.

Three users are setup for testing and development purposes:
"""

import pytest
from sqlalchemy.orm import Session
from ...models.user import User
from ...entities.user_entity import UserEntity
from .reset_table_id_seq import reset_table_id_seq


evan = User(
    id=1,
    first_name="Evan",
    last_name="Explorer",
    username="evanexplorer",
    email="evanexplorer@gmail.com",
    bio="Hey there! Let's explored Washington!",
    pronouns="He / Him / His", 
    phone='11111111',
    password='password'
)

harry = User(
    id=2,
    first_name="Harry",
    last_name="Helper",
    username="harryhelper",
    email="harryhelper@gmail.com",
    bio="Hey there! Let's explored Washington!",
    pronouns="He / Him / His", 
    phone='2222222',
    password='password'
)

users = [evan, harry]

def insert_fake_data(session: Session):
    global users
    entities = []
    for user in users:
        entity = UserEntity.from_model(user)
        session.add(entity)
        entities.append(entity)
    reset_table_id_seq(session, UserEntity, UserEntity.id, len(users) + 1)
    session.commit()  # Commit to ensure User IDs in database

    # Associate Users with the Role(s) they are in
    # for role_id, members in roles_users.items():
    #     for user in members:
    #         session.execute(
    #             user_role_table.insert().values(
    #                 {"role_id": role_id, "user_id": user.id}
    #             )
    #         )

@pytest.fixture(autouse=True)
def fake_data_fixture(session: Session):
    insert_fake_data(session)
    session.commit()
    yield
