import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import './onlineFriendsHorizontal.css'
import Avatar from 'react-avatar';

const OnlineFriendsHorizontal = () => {


    const mainDivRef = useRef();


    const [friends, setFriends] = useState([])
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - mainDivRef.current.offsetWidth;
    };

    const slideRight = () => {
        console.log('click')
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + mainDivRef.current.offsetWidth;
    };

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();

    }, [user]);



    return (
        <>
            <div className='horizontalFriends'>
                <MdChevronLeft className='absolute left-0 opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
                <div id="slider" ref={mainDivRef}>

                    {friends.map(friend => (
                        <Link key={friend.username} to={"/profile/" + friend._id} className="linkFriend">
                            <Avatar  src={friend.profilePicture && PF + friend.profilePicture} name={!friend.profilePicture && friend.username} size={64}  className="horizontalFollowingImg" />

                           {/*  <img src={friend.profilePicture ? PF + friend.profilePicture : `${PF}person/noAvatar.png`} alt="" className="horizontalFollowingImg" /> */}

                        </Link>

                    ))}







                </div>
                <MdChevronRight className='absolute right-0 items-end opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
            </div>

        </>
    )
}

export default OnlineFriendsHorizontal