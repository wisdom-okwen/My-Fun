import React from "react";
import { SideBar } from "../SideBar/SideBar";
import "./Shell.css";
import { PostPage } from "../PostPage/PostPage";

const Shell: React.FC = () => {
    return (
        <div className="shell">
            <SideBar id="side-bar" />
            <PostPage id="post-page" />
        </div>
    );
};

export { Shell };