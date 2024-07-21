import { Avatar } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/AuthContext";


const Profile: React.FC = () => {
    const currentUser = useContext(UserContext);
    const navigate = useNavigate();

    const handleAvatarClick = () => {
        navigate("/login");
    };

    return (
        <div className="profile">
            <Avatar sx={{ color: 'white', backgroundColor: '#084d96' }} onClick={handleAvatarClick} alt="Remy Sharp" src="" />
        </div>
    );
};

export { Profile };