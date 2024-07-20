import React, { useState, useEffect } from "react";
import "./PostPage.css";
import { PostServiceImpl } from "../../services/PostService";
import { Post } from "../../models/PostCard.model";
import { PostCard } from "../PostCard/PostCard";
import { TitleBar } from "./TitleBar";

const baseUrl = '/api';
const postService = new PostServiceImpl(baseUrl);

interface PostPageProps {
    id: string;
}

const PostPage: React.FC<PostPageProps> = ({ id }) => {
    const [posts, setPosts] = useState<Post[]>();

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
            {posts?.map((post, ind) => (
                <PostCard key={ind} {...post} />
            ))}
        </div>
    );
};

export { PostPage };