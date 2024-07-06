import React from "react";
import "./SideBar.css";
import { Profile } from "../Profile/Profile";

const SideBar: React.FC = () => {
    return (
        <div className="sidebar">
            <Profile />
        </div>
    );
};

export { SideBar };
