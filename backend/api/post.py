from fastapi import APIRouter, Depends
from ..services.post import PostService
from ..models import Post

api = APIRouter(prefix='/api/posts')
openapi_tags = {
    "name": "Posts",
    "description": "Post profile search and related operations."
}

@api.get('', response_model=list[Post], tags=['Posts'])
def get_posts(
    post_service: PostService = Depends()
) -> list[Post]:
    """Get all posts from db."""
    return post_service.all()


@api.get(
    '/{id}',
    response_model=Post,
    responses={404: {'model': None}},
    tags=['Posts']
)
def get_by_id(
    id: int,
    post_service: PostService = Depends()
):
    return post_service.get(id)


@api.post('', response_model=Post, tags=['Posts'])
def new_post(
    post: Post,
    post_service: PostService = Depends()
) -> Post:
    return post_service.create(post)


@api.put('', response_model=Post, tags=['Posts'])
def update_post(
    post: Post,
    post_service: PostService = Depends()
) -> Post:
    return post_service.update(post)


@api.delete('/{id}', response_model=None, tags=['Posts'])
def delete_post(
    id: int,
    post_service: PostService = Depends()
):
    post_service.delete(id)
