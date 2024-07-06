import axios from 'axios';
import { User } from '../models/User.model';

interface UserService {
  getUser(username: string): Promise<User | null>;
  updateUser(username: string, userData: Partial<User>): Promise<User | null>;
  createUser(userData: Partial<User>): Promise<User |null>;
};

class UserServiceImpl implements UserService {
    private baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    };

    getUser(username: string): Promise<User | null> {
        throw new Error('Method not implemented.');
    }
    updateUser(username: string, userData: Partial<User>): Promise<User | null> {
        throw new Error('Method not implemented.');
    }
    createUser(userData: Partial<User>): Promise<User | null> {
        return axios.post<User>(`${this.baseUrl}/user`, userData)
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                return null;
            });
    };
    
};

export { UserServiceImpl }