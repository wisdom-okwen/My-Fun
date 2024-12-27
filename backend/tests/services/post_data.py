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
    num_likes=63,
    num_shares=2,
    num_comments=41
)

post2 = Post(
    id=2,
    description='An amazing view at Lake 22',
    author_id=2,
    state=2,
    image_url='https://www.wta.org/site_images/trip-reports/2024/tripreport-image-2024-07-16.104113646800/@@images/image-1400-75eb4bde01cfa93de7b9e102bb72c77a.jpeg',
    date='05/14/2018',
    time='12:23pm',
    num_likes=11,
    num_shares=7,
    num_comments=9
)

post3 = Post(
    id=3,
    description='Taking a walk through the Bellevue Park, breathtaking experience!',
    author_id=1,
    state=2,
    image_url='https://www.wta.org/site_images/hikes/b66ea98f-1d55-4285-be09-c8da74c49a32.jpeg/@@images/37f72583-ca4d-417b-8903-c667ef2c239b.jpeg',
    date='11/20/2020',
    time='09:56am',
    num_likes=5,
    num_shares=3,
    num_comments=1
)

post4 = Post(
    id=4,
    description="What's more beautiful than the Appalachian Mountains?",
    author_id=1,
    state=2,
    image_url='https://appalachiantrail.org/wp-content/uploads/2019/01/Mt.-Liberty-Sunset.jpg',
    date='11/20/2020',
    time='09:56am',
    num_likes=1011,
    num_shares=679,
    num_comments=465
)

post5 = Post(
    id=5,
    description="The Amazing Egyptian pyramids!",
    author_id=1,
    state=2,
    image_url='https://img.huffingtonpost.com/asset/6698fe612300001c00f7e89c.jpg?ops=1778_1000',
    date='11/20/2020',
    time='09:56am',
    num_likes=5,
    num_shares=1,
    num_comments=41
)

post6 = Post(
    id=6,
    description="Yellow Stone Park scared the hell out of me but gave me a solid experience. Loved it!",
    author_id=1,
    state=2,
    image_url='https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTj41i0yWBVBewfoGxTGQ7FBYMDWMD7cp7lBCxKl7uhe8yan2wYRzEejhKFBzRRcsmHjz3xpnehGfOtnsKjj_sXnavDH2S5r2gHzTi1-Q',
    date='11/20/2020',
    time='09:56am',
    num_likes=359,
    num_shares=20,
    num_comments=14
)

post7 = Post(
    id=7,
    description="The Great Wall of China is just amazing!",
    author_id=1,
    state=2,
    image_url='https://www.tripsavvy.com/thmb/S6Daq_joeyN3xU0Bz3Qt7QGe0YM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-654013042-28f42fc82c544a9fb0f74458b85de713.jpg',
    date='11/20/2020',
    time='09:56am',
    num_likes=2,
    num_shares=6,
    num_comments=19
)

post8 = Post(
    id=8,
    description="The beautiful city of Accra, Ghana",
    author_id=1,
    state=2,
    image_url='https://spacegeneration.org/wp-content/uploads/2020/07/Accra-Ghana.jpg',
    date='11/20/2020',
    time='09:56am',
    num_likes=0,
    num_shares=2,
    num_comments=8
)

post9 = Post(
    id=9,
    description="Snoqualmie Falls in Bellevue, so beautiful!",
    author_id=1,
    state=2,
    image_url='https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSuboBS7hwA4knLhABbH_HgRPjaZKxAZuvcizfGvzEl996UU7LwXuKD9iyhXxYLOZoUpB7y5TBqcHmJPmdVFYafXGS1P9l4eREaQT-2yw',
    date='11/20/2020',
    time='09:56am',
    num_likes=1,
    num_shares=0,
    num_comments=4
)

post10 = Post(
    id=10,
    description="UNC-Chapel Hill is at the heart of what’s next, preparing talented students from different perspectives and life experiences to become creators, explorers, entrepreneurs and leaders. Tar Heels develop a voice for critical thought and the courage to guide change. Carolina’s nationally recognized teaching, groundbreaking research and dedication to public service continue a legacy that began when the University was chartered in 1789 and opened to students four years later.",
    author_id=1,
    state=2,
    image_url='https://www.unc.edu/wp-content/uploads/2021/07/020419_old_well_summer004-scaled-e1625573140177.jpg',
    date='11/20/2020',
    time='09:56am',
    num_likes=1234,
    num_shares=45,
    num_comments=19
)

post11 = Post(
    id=11,
    description='A gem in the Volta Region of Ghana. Wli Water Falls',
    author_id=2,
    state=2,
    image_url='https://ghanaremembers.com/storage/public/the-stunning-wli-waterfalls.jpg',
    date='05/14/2018',
    time='12:23pm',
    num_likes=11,
    num_shares=7,
    num_comments=9
)

post12 = Post(
    id=12,
    description='A trip to Kakum National Park in Ghana',
    author_id=2,
    state=2,
    image_url='https://www.easytrackghana.com/images/photos2/og/kakum-canopy-walkway-bridges.jpg',
    date='05/14/2018',
    time='12:23pm',
    num_likes=11,
    num_shares=7,
    num_comments=9
)

post13 = Post(
    id=13,
    description='I enjoyed my visit to Le Louvre in France. Quite not too impressive though.',
    author_id=2,
    state=2,
    image_url='https://www.relaisdulouvre.com/wp-content/uploads/2024/03/Louvre1-1024x682.jpg',
    date='05/14/2018',
    time='12:23pm',
    num_likes=11,
    num_shares=7,
    num_comments=9
)

post14 = Post(
    id=14,
    description='This part of Capetown, South Africa, is so nice!',
    author_id=2,
    state=2,
    image_url='https://www.zicasso.com/static/df1e8854d80a4880bba5857231010399/6d821/df1e8854d80a4880bba5857231010399.jpg',
    date='05/14/2018',
    time='12:23pm',
    num_likes=11,
    num_shares=7,
    num_comments=9
)


posts = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14]


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