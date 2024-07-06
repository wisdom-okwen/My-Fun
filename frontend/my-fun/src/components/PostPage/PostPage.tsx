import React from "react";
import "./PostPage.css";
import { LandingPage } from "../LandingPage/LandingPage";

const PostPage: React.FC = () => {
    return (
        <div className="post-page">
            <LandingPage />
        </div>
    );
};

export { PostPage };
