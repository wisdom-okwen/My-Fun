import './App.css';
import React from 'react';
import { LandingPage } from './components/LandingPage';

interface AppProps{
    message: string;
}

const App: React.FC<AppProps> = ({message}) => {
    return (
        <>
            <div>{message}</div>
            <LandingPage />
        </>
    );
}

export default App;
