import React from "react";
import "./PostPage.css";
import { LandingPage } from "../LandingPage/LandingPage";

const PostPage: React.FC = () => {
    console.log("This page is rendered");
    return (
        <div className="post-page">
            <LandingPage />
        </div>
    );
};

export { PostPage };
