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

    function shuffleArray<T>(array: T[]): T[] {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    const fetchPosts = async () => {
        const fetchedPosts = await postService.getPosts();
        if (fetchedPosts) {
            const publishedPosts = fetchedPosts.filter(post => post.state === 2);
            setPosts(shuffleArray(publishedPosts));
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
        // await postService.archivePost(id);
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