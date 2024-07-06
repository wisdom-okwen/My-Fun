import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
    const [formState, setFormState] = useState({
        isLogin: true,
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        pronouns: ''
    });

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

    const handleRegister = () => {
        // Add registration logic here
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