import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import './messenger.css';
import axios from 'axios';
import { io } from "socket.io-client";
import Sidebar from '../../components/sidebar/Sidebar';
import {TbMessage2Share} from 'react-icons/tb'

const Messenger = () => {

  const { user } = useContext(AuthContext);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUser] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null)
  const [userChattingWith, setUserChattingWith] = useState(null)
  const socket = useRef();
  const scrollRef = useRef();


  //const friendId = conversation.members.find(member => member !== currentUser._id);

  const setupConversationWithFriend = async (friendId, conversationId) => {
    try {
      const res = await axios.get("/users?userId=" + friendId);
      setUserChattingWith(res.data);
      setActiveConversation(conversationId)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setHasLoaded(true);
    /* socket.current = io("ws://localhost:8900");
     socket.current.on("getMessage", data => {
       setArrivalMessage({
         sender: data.senderId,
         text: data.text,
         createdAt: Date.now(),
       })
     })*/
  }, [])

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages(prev => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])



  useEffect(() => {
    /* socket.current?.emit("addUser", user._id);
     socket.current?.on("getUsers", users => {
       setOnlineUser(user.followings.filter(following => users.some(u => u.userId === following)));
     })*/
  }, [user])






  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        console.log(res.data)
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getConversations();
  }, [user._id]);

  useEffect(() => {

    const getMessages = async () => {
      console.log('GET MESSAGES')
      console.log(currentChat);
      try {
        const res = await axios.get("/messages/" + currentChat._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
  }, [currentChat]);




  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.length === 0) return;
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    };

    const receiverId = currentChat.members.find(member => member !== user._id)

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage
    })

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error)
    }
  }





  return (
    <>
      <Topbar />

      <div className='messenger'>
        <Sidebar selected="chat" />
        <div className={`chatMenu ${hasLoaded ? 'chatMenuAfter' : 'chatMenuBefore'}`}>
          <div className="chatMenuWrapper">
            <input type="text" placeholder="Search for friends..." className="chatMenuInput" />
            {conversations.map((conversation, index) => (
              <>
                <div onClick={() => setCurrentChat(conversation)}>
                  <Conversation key={conversation._id} conversation={conversation} currentUser={user} isSelected={activeConversation === conversation._id} selectConversation={() => setupConversationWithFriend(conversation.members.find(member => member !== user._id), conversation._id)} />
                </div>
                {conversations[index + 1] && <hr className='conversationSeparator' />}
                <hr className='conversationSeparator' />
              </>

            ))}
          </div>
        </div>
        <div className={`chatBox ${currentChat ? "backdrop-blur" : ""}`}>
          <div className={`${currentChat ? "chatBoxWrapper" : 'flex h-full justify-center'}`}>
            {currentChat ?
              <>
                <div className="chatBoxTop">
                  {messages.map(message => (
                    <div ref={scrollRef}>
                      <Message message={message} own={message.sender === user._id} name={message.sender === user._id ? user.username : userChattingWith.username} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <input type="text" placeholder='Write something...' className='chatMessageInput' onChange={(e) => setNewMessage(e.target.value)}></input>
                  <button className="chatSubmitButton" onClick={handleSubmit}><TbMessage2Share size={40} /></button>
                </div>
              </> : <span className='noConversationText'>Open a conversation to start a chat</span>}
          </div>
        </div>
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
          </div>
        </div> */}
      </div>

    </>
  )
}

export default Messenger