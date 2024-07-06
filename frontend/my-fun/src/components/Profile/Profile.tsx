import { Avatar } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../auth/AuthContext";

const Profile: React.FC = () => {
    const currentUser = useContext(UserContext);
    return (
        <>
            <Avatar alt="Remy Sharp" src="" />
        </>
    );
};

export { Profile };