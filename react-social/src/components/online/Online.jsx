import React from 'react'
import './online.css';
import { Link } from 'react-router-dom'
import Avatar from 'react-avatar';

const Online = ({ user }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const profilePicture = PF + user.profilePicture

    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                {/* <img className='rightbarProfileImg' src={profilePicture} alt="" /> */}
                <Link key={user.username} to={"/profile/" + user._id} className="linkFriend">
                    <Avatar src={user.profilePicture && PF + user.profilePicture} name={!user.profilePicture && user.username} size={64} className="rightbarProfileImg" />
                </Link>
                <span className="rightbarOnline"></span>
            </div>
            <span className="onlineUsername">{user.username}</span>
        </li>
    )
}

export default Online
