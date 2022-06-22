import React from 'react'
import './message.css'
import { format } from 'timeago.js';
import Avatar from 'react-avatar';

const Message = ({ own, message, name }) => {
    console.log("NAME");
    console.log(name);
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <Avatar className='messageImg' size={40}  name={name} />
                <p className='messageText'>{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

export default Message