import React from "react";
import { SideBar } from "../SideBar/SideBar";
import "./Shell.css";
import { PostPage } from "../PostPage/PostPage";

const Shell: React.FC = () => {
    return (
        <div className="shell">
            <SideBar />
            <PostPage />
        </div>
    );
};

export { Shell }