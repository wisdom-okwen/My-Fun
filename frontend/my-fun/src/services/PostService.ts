import axios from 'axios';
import { Post } from '../models/PostCard.model';

interface PostService {
    getPost(id: number): Promise<Post | null>;
    getPosts(): Promise<Post[] | null>;
    createPost(post: Partial<Post>): Promise<Post | null>;
    updatePost(post: Partial<Post>): Promise<Post | null>;
    deletePost(id: number): Promise<null>;
}

class PostServiceImpl implements PostService {
    private baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    
    async getPosts(): Promise<Post[] | null> {
        try {
            const response = await axios.get<Post[]>(`${this.baseUrl}/posts`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getPost(id: number): Promise<Post | null> {
        try {
            const response = await axios.get<Post>(`${this.baseUrl}/posts/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createPost(post: Partial<Post>): Promise<Post | null> {
        try {
            const response = await axios.post<Post>(`${this.baseUrl}/posts`, post);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updatePost(post: Partial<Post>): Promise<Post | null> {
        try {
            const response = await axios.put<Post>(`${this.baseUrl}/posts/${post.id}`, post);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deletePost(id: number): Promise<null> {
        try {
            await axios.delete(`${this.baseUrl}/posts/${id}`);
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async archivePost(id: number): Promise<Post | null>{
        try {
            const resonse = await axios.put(`${this.baseUrl}/posts/${id}`);
            return resonse.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export { PostServiceImpl }