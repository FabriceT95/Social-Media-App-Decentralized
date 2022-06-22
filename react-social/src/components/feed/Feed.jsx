import React, { useState, useEffect } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Feed = ({ userId }) => {
  
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = userId ?
        await axios.get(`/posts/profile/${userId}`) :
        await axios.get("posts/timeline/" + user._id);
      setPosts(res.data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)));
    }

    fetchPosts();



  }, [userId, user.id])

  return (
    <div className='feed'>
      <div className="feedWrapper">
        {(!userId || userId === user._id) && <Share />}
        {posts.map(post => (<Post key={post._id} post={post} />))}

      </div>
    </div>
  )
}

export default Feed