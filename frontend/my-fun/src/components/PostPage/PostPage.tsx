import React, { useState, useEffect } from "react";
import "./PostPage.css";
import { PostServiceImpl } from "../../services/PostService";
import { Post } from "../../models/PostCard.model";
import { PostCard } from "../PostCard/PostCard";
import { TitleBar } from "./TitleBar";
import { BottomBar } from "./BottomBar";

const baseUrl = '/api';
const postService = new PostServiceImpl(baseUrl);

interface PostPageProps {
    id: string;
}

const PostPage: React.FC<PostPageProps> = ({ id }) => {
    const [posts, setPosts] = useState<Post[]>();

    const handleCreatePost = () => {
        console.log('Create post was clicked')
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await postService.getPosts();
            if (fetchedPosts) {
                setPosts(fetchedPosts)
            }
            console.log(fetchedPosts);
        }
        fetchPosts();
    }, []);

    return (
        <div className="post-page">
            <TitleBar />
            <div className="posts"></div>
                {posts?.map((post, ind) => (
                    <PostCard key={ind} {...post} />
                ))}
            <div className="post-page"></div>
            <BottomBar handleCreatePost={handleCreatePost}/>
        </div>
    );
};

export { PostPage };