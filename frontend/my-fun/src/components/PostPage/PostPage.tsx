import React from "react";
import { postPageStyles } from "./PostPage.styles";
import { LandingPage } from "../LandingPage/LandingPage";

const PostPage: React.FC = () => {
    console.log("This page is rendered");
    return (
        <div style={postPageStyles}>
            <LandingPage />
            <LandingPage />
            <LandingPage />
            <LandingPage />
        </div>
    );
};

export { PostPage };