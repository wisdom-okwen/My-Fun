import React from 'react';

interface LoginFormProps {
    username: string;
    password: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onLogin: () => void;
    onToggleForm: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ username, password, onInputChange, onLogin, onToggleForm }) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onLogin();
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account?{' '}
                <button onClick={onToggleForm}>Create one</button>
            </p>
        </div>
    );
};
