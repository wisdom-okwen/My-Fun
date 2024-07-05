import './App.css';
import React from 'react';
import { Shell } from './components/Shell/Shell';

interface AppProps{
    message: string;
}

export const App: React.FC<AppProps> = ({message}) => {
    return (
        <>
            <Shell />
        </>
    );
}

