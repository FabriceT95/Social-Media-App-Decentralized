import React from 'react'
import './closeFriend.css';

const CloseFriend = ({ user }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const profilePicture = PF + user.profilePicture

    return (
        <li className="sidebarFriend">
            <img src={profilePicture} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}

export default CloseFriend