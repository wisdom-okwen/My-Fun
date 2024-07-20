import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Shell } from './components/Shell/Shell';
import { UserContextProvider } from './contexts/AuthContext';
import { LoginPage } from './components/LoginPage/LoginPage';

export const App: React.FC = () => {
    return (
        // <div className="container">
            <BrowserRouter>
                <UserContextProvider>
                    <Routes>
                        <Route path="/" element={<Shell />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </UserContextProvider>
            </BrowserRouter>
        // </div>
        
    );
};
