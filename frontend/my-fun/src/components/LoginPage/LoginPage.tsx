import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import './LoginPage.css';
import { User } from '../../models/User.model';
import { UserServiceImpl } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../contexts/AuthContext';


const userService = new UserServiceImpl('/api');

const initialState = {
    isLoggedIn: true,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    pronouns: ''
}

export const LoginPage: React.FC = () => {
    // const { login } = useContext(UserContext);
    const [formState, setFormState] = useState(initialState);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleToggleForm = () => {
        setFormState(prevState => ({
            ...prevState,
            isLoggedIn: !prevState.isLoggedIn
        }));
    };

    const handleLogin = async () => {
        const { username, password } = formState;
        const loggedUser = await userService.logInUser(username, password);
        if (loggedUser) {
            // login(loggedUser.userId, loggedUser.accessToken)
            navigate(localStorage.getItem('prevPage') || '/');
            console.log('Logging in with:', username, password);
            setFormState(initialState);
        } else {
            console.log('Login failed for username:  ', username)
        }
    };

    const handleRegister = async () => {
        const { firstName, lastName, username, email, phone, bio, pronouns, password } = formState;
        const userData: Partial<User> = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            phone: phone,
            pronouns: pronouns,
            email: email,
            password: password,
            bio: bio
        };

        const newUser = await userService.createUser(userData);
        if (newUser) {
            console.log('User registered successfully:', newUser.username)
            navigate('/');
            setFormState(initialState);
        } else{
            console.log('Registeration failed ', formState.username);
        }
    };

    return (
        <div className="login-container">
            {formState.isLoggedIn ? (
                <LoginForm
                    username={formState.username}
                    password={formState.password}
                    onInputChange={handleInputChange}
                    onLogin={handleLogin}
                    onToggleForm={handleToggleForm}
                />
            ) : (
                <RegisterForm
                    firstName={formState.firstName}
                    lastName={formState.lastName}
                    username={formState.username}
                    email={formState.email}
                    phone={formState.phone}
                    bio={formState.bio}
                    pronouns={formState.pronouns}
                    password={formState.password}
                    onInputChange={handleInputChange}
                    onRegister={handleRegister}
                    onToggleForm={handleToggleForm}
                />
            )}
        </div>
    );
};