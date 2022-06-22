import React from 'react'
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import Avatar from 'react-avatar';


const Topbar = () => {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className='topbarContainer' >
            <div className="topbarLeft">
                <Link to="/" className='no-underline'>
                    <span className="logo">Yolo Social</span>
                </Link>

            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className='searchIcon' />
                    <input placeholder='Search for friend, post or video' type="text" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">           
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Link to="/messenger" className='no-underline'>
                            <Chat />
                        </Link>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user._id}`}>
                <Avatar className='postProfileImg' size={40} src={user.profilePicture && PF + user.profilePicture} name={!user.profilePicture && user.username} />
                </Link>
                <div className='z-10 lg:hidden' onClick={() => { }}>
                    {/* !nav ? */ <FaBars />/*  : <FaTimes /> */}
                </div>

            </div>
        </div>
    )
}

export default Topbar