import React from 'react';
import {useAuth} from "../context/AuthContext.jsx";

const Profile = () => {
    const { user, handleLogout } = useAuth();

    return <div className="profile">
        <span>Hello, {user.name}</span>
        <a href="#" onClick={handleLogout}>Logout</a>
    </div>
}

export default Profile;
