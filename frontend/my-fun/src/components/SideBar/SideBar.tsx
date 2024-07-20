import React from "react";
import "./SideBar.css";
import { Profile } from "../Profile/Profile";

interface SideBarProps {
    id: string;
}

const SideBar: React.FC<SideBarProps> = ({ id }) => {
    return (
        <div id={id} className="sidebar">
            <Profile />
        </div>
    );
};

export { SideBar };