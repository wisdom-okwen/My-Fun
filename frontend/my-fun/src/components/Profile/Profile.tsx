import { Avatar } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../auth/AuthContext";

const Profile: React.FC = () => {
    const currentUser = useContext(UserContext);
    const navigate = useNavigate();

    const handleAvatarClick = () => {
        navigate("/login");
    };

    return (
        <>
            <Avatar onClick={handleAvatarClick} alt="Remy Sharp" src="" />
        </>
    );
};

export { Profile };