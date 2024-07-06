import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import './LoginPage.css';
import { User } from '../../models/User.model';
import { UserServiceImpl } from '../../services/UserService';


const UserService = new UserServiceImpl('/api');

const initialState = {
    isLogin: true,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pronouns: ''
}

export const LoginPage: React.FC = () => {
    const [formState, setFormState] = useState(initialState);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleToggleForm = () => {
        setFormState(prevState => ({
            ...prevState,
            isLogin: !prevState.isLogin
        }));
    };

    const handleLogin = () => {
        // Add login logic here
        console.log('Logging in with:', formState.username, formState.password);
    };

    const handleRegister = async () => {
        const { firstName, lastName, username, email, phone, pronouns, password } = formState;
        const userData: Partial<User> = {
            first_name: firstName,
            last_name: lastName,
            user_name: username,
            phone: phone,
            pronouns: pronouns,
            email: email,
            password: password
        };

        const newUser = await UserService.createUser(userData);
        if (newUser) {
            console.log('User registered successfully:', newUser)
        }
        console.log('Registering with:', formState);
    };

    return (
        <div className="login-container">
            {formState.isLogin ? (
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