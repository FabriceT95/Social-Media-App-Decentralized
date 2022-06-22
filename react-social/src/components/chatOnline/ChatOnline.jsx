import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import './chatonline.css';

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId)
      setFriends(res.data);
    }

    getFriends()
  }, [currentId])

  useEffect(() => {
    setOnlineFriends(friends.filter(friend => onlineUsers.includes(friend._id)))
  }, [friends, onlineUsers])

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="chatOnline">
      {onlineFriends.map((onlineFriend) => (
        <div className="chatOnlineFriend" key={onlineFriend._id} onClick={() => handleClick(onlineFriend)}>
          <div className="chatOnlineImgContainer">
            <img className='chatOnlineImg' src={onlineFriend?.profilePicture ? PF+onlineFriend.profilePicture : PF+"person/noAvatar.png"} alt="" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{onlineFriend?.username}</span>
        </div>
      ))}

    </div>
  )
}

export default ChatOnline