import React, { useState, useEffect } from "react";
import { PostServiceImpl } from "../../services/PostService";
import { Post } from "../../models/PostCard.model";
import { PostCard } from "../PostCard/PostCard";
import { TitleBar } from "./TitleBar";
import { BottomBar } from "./BottomBar";
import { PostForm } from "../PostForm/PostForm";
import "./PostPage.css";


const baseUrl = '/api';
const postService = new PostServiceImpl(baseUrl);

interface PostPageProps {
    id: string;
}

const PostPage: React.FC<PostPageProps> = ({ id }) => {
    const [posts, setPosts] = useState<Post[]>();
    const [open, setOpen] = useState(false);


    const handleCreatePost = () => {
        setOpen(true);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await postService.getPosts();
            if (fetchedPosts) {
                setPosts(fetchedPosts)
            }
        }
        fetchPosts();
    }, []);

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <div className="post-page">
            <TitleBar />
            <div className="posts"></div>
                {posts?.map((post, ind) => (
                    <PostCard key={ind} {...post} />
                ))}
            <div className="post-page"></div>
            <BottomBar handleCreatePost={handleCreatePost}/>
            <PostForm open={open} onClose={handleCloseModal}/>
        </div>
    );
};

export { PostPage };