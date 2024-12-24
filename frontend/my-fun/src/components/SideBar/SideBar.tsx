import React from "react";
import "./SideBar.css";
import { Profile } from "../Profile/Profile";

interface SideBarProps {
    id: string;
}

const SideBar: React.FC<SideBarProps> = ({ id }) => {
    return (
        <div id={id} className="sidebar">
            <div className="side-bar-title"><h2 id="side-bar-header">My Fun</h2></div>
            <div className="side-bar-items">
                <div className="side-bar-item">My Posts</div>
                <div className="side-bar-item">My Bucket List</div>
                <div className="side-bar-item">Archived Posts</div>
                <div className="side-bar-item">My Recommendations</div>
                <div className="side-bar-item">What To Do In City</div>
            </div>
            <Profile />
        </div>
    );
};

export { SideBar };