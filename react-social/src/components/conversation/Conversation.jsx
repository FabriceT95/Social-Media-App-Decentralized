import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './conversation.css';
import Avatar from 'react-avatar';
import { format } from 'timeago.js';


const Conversation = ({ conversation, currentUser, isSelected, selectConversation }) => {

  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  useEffect(() => {
    const friendId = conversation.members.find(member => member !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error)
      }
    }

    getUser();
  }, [currentUser, conversation]);

  return (
    <div className={`conversation ${isSelected ? "gradient-border" : "conversation__hover"}`} onClick={selectConversation}>
      <Avatar className='conversationImg' size={40} src={user?.profilePicture && PF + user.profilePicture} name={!user?.profilePicture && user?.username} />
      <div className='conversationContent'>
        <div className='conversationTop'>
          <span className="conversationName">{user?.username}</span>
          <span className="conversationTimeago">{format(conversation?.textCreatedAt)}</span>
        </div>

        <span className="conversationLastMessage">{conversation?.text}</span>
      </div>

    </div>
  )
}

export default Conversation