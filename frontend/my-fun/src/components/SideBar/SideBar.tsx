import React from "react";
import { styles } from "./SideBar.styles";
import { Profile } from "../Profile/Profile";

const SideBar: React.FC = () => {
    return (
        <div style={styles}>
            <Profile />
        </div>
    );
};

export { SideBar };
