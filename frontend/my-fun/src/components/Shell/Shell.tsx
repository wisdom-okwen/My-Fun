import React from "react";
import { SideBar } from "../SideBar/SideBar";
import { shellStyles } from "./Shell.styles";
import { PostPage } from "../PostPage/PostPage";

const Shell: React.FC = () => {
    return (
        <div style={shellStyles}>
            <SideBar />
            <PostPage />
        </div>
    );
};

export { Shell }