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
                <div className="side-bar-item">Hey There</div>
                <div className="side-bar-item">Hey There</div>
                <div className="side-bar-item">Hey There</div>
                <div className="side-bar-item">Hey There</div>
                <div className="side-bar-item">Hey There</div>
                <div className="side-bar-item">Hey There</div>
                <div className="side-bar-item">Hey There</div>
                <div className="side-bar-item">Hey There</div>
                <div className="side-bar-item">Hey There</div>
            </div>
            <Profile />
        </div>
    );
};

export { SideBar };