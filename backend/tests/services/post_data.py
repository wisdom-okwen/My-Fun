"""
Mock data for posts.
"""
import pytest
from sqlalchemy.orm import Session
from ...models import Post
from ...entities.post import PostEntity
from .reset_table_id_seq import reset_table_id_seq

post1 = Post(
    id=1,
    description='My very first time visiting Mountain Rainer',
    author_id=1,
    state=2,
    image_url='https://www.tehaleh.com/media/8070156/mt-rainier-paradise-1.png?format=jpeg',
    date='06/06/2024',
    time='06:34pm',
    num_likes=63
)

post2 = Post(
    id=2,
    description='An amazing view at Lake 22',
    author_id=2,
    state=2,
    image_url='https://www.google.com/url?sa=i&url=https%3A%2F%2Fbackobeyond.blog%2Fhiking-guide-lake-22%2F&psig=AOvVaw3_fU3IfmZ05h9Qqt6VbQHP&ust=1721030578837000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwik6dTTiKaHAxVuIDQIHW2PBBUQjRx6BAgAEBU',
    date='05/14/2018',
    time='12:23pm',
    num_likes=11
)

post3 = Post(
    id=3,
    description='Taking a walk through the Bellevue Park, breathtaking experience!',
    author_id=1,
    state=1,
    image_url='https://www.wta.org/site_images/hikes/b66ea98f-1d55-4285-be09-c8da74c49a32.jpeg/@@images/37f72583-ca4d-417b-8903-c667ef2c239b.jpeg',
    date='11/20/2020',
    time='09:56am',
    num_likes=5
)

posts = [post1, post2, post3]

def insert_fake_data(session: Session):
    global posts
    entities = []
    for post in posts:
        entity = PostEntity.from_model(post)
        session.add(entity)
        entities.append(entity)
    reset_table_id_seq(session, PostEntity, PostEntity.id, len(posts)+1)
    session.commit()


@pytest.fixture(autouse=True)
def fake_data_fixture(session: Session):
    insert_fake_data(session)
    session.commit()
    yield