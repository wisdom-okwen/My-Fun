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
    id?: string;
}

const PostPage: React.FC<PostPageProps> = ({ id }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [open, setOpen] = useState(false);

    const handleCreatePost = () => {
        setOpen(true);
    }

    const fetchPosts = async () => {
        const fetchedPosts = await postService.getPosts();
        if (fetchedPosts) {
            setPosts(fetchedPosts)
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handlePostCreated = async () => {
        await fetchPosts(); 
        handleCloseModal();
      };

      const handleDeletePost = async (id: number) => {
        await postService.deletePost(id);
        fetchPosts();
      };
      
      const handleArchivePost = async (id: number) => {
        // your archive logic
        const post = await postService.getPost(id);
        if (post) {
            post.state = 3;
            await postService.updatePost(post);
        }
        fetchPosts(); // refresh
      };
      
      const handleEditPost = (id: number) => {
        // show an edit modal or navigate to an edit page
      };

    return (
        <div className="post-page">
            <TitleBar />
            <div className="posts"></div>
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    {...post}
                    onDelete={handleDeletePost}
                    onArchive={handleArchivePost}
                    onEdit={handleEditPost}
                />
                ))}
            <div className="post-page"></div>
            <BottomBar handleCreatePost={handleCreatePost}/>
            <PostForm open={open} onClose={handleCloseModal} onPostCreated={handlePostCreated}/>
        </div>
    );
};

export { PostPage };