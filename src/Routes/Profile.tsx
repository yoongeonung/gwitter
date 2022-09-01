import React from 'react';
import {authProvider} from "../fbase";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const onLogoutClick = async () => {
        await authProvider.signOut(authProvider.auth);
        navigate("/", {replace: true});
    }
    return (
        <div>
            Profile
            <button onClick={onLogoutClick}>Log out</button>
        </div>
    );
}

export default Profile;