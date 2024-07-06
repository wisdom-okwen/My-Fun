import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Shell } from './components/Shell/Shell';

interface AppProps{
    message: string;
}

export const App: React.FC<AppProps> = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Shell />} />
            </Routes>
        </BrowserRouter>
    );
}

