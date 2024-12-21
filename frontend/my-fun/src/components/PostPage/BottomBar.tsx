import React from "react";
import './BottomBar.css';

interface BottomBarProps {
  handleCreatePost(): void;
}

const BottomBar: React.FC<BottomBarProps> = ({ handleCreatePost }) => {
  return (
    <div className="fixed-create-post">
      <button onClick={handleCreatePost}>Create Post</button>
      <button onClick={handleCreatePost}>Stories</button>
      <button onClick={handleCreatePost}>Reels</button>
    </div>
  );
};

export { BottomBar };
