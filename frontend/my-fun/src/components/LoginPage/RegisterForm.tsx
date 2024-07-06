import React from 'react';

interface RegisterFormProps {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    pronouns: string;
    bio: string;
    password: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onRegister: () => void;
    onToggleForm: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
    firstName,
    lastName,
    username,
    email,
    phone,
    pronouns,
    bio,
    password,
    onInputChange,
    onRegister,
    onToggleForm
}) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onRegister();
    };

    return (
        <div className="login-form">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="firstName"
                        value={firstName}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="lastName"
                        value={lastName}
                        onChange={onInputChange}
                        required
                    />
                </div>
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
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pronouns">Pronouns</label>
                    <input
                        type="text"
                        id="pronouns"
                        name="pronouns"
                        value={pronouns}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={bio}
                        onChange={onInputChange}
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
                <button type="submit">Create Account</button>
            </form>
            <p>
                Already have an account?{' '}
                <button onClick={onToggleForm}>Login</button>
            </p>
        </div>
    );
};