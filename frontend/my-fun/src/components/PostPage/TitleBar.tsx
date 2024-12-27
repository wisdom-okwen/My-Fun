import React from "react";
import { LandingPage } from "../LandingPage/LandingPage";
import SettingsIcon from '@mui/icons-material/Settings';
import './TitleBar.css';

const TitleBar: React.FC = () => {
    return (
        <div className="title-bar">
            <div className="title-center">
                <LandingPage />
            </div>
            <div className="settings-icon">
                <SettingsIcon
                    sx={{
                        color: '#0056b3',
                        cursor: 'pointer',
                        transform: 'rotate(-30deg)',
                        transition: 'transform 0.2s, color 0.2s',
                    }}
                />
            </div>
        </div>
    );
}

export { TitleBar };
