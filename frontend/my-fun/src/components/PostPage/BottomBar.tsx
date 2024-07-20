import React from "react";
import './BottomBar.css';

interface BottomBarProps {
    handleCreatePost(): void;
}

const BottomBar: React.FC<BottomBarProps> = ({ handleCreatePost }) => {
    return (
        <div className="fixed-create-post">
            <button onClick={handleCreatePost}>Create Post</button>
        </div>
    );
}

export { BottomBar };