import './App.css';
import React from 'react';
import { LandingPage } from './components/LandingPage/LandingPage';

interface AppProps{
    message: string;
}

export const App: React.FC<AppProps> = ({message}) => {
    return (
        <>
            <div>{message}</div>
            <LandingPage />
            <LandingPage />
            <LandingPage />
            <LandingPage />
            <LandingPage />
            <LandingPage />
        </>
    );
}

