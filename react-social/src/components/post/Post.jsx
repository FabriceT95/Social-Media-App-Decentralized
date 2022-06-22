import './post.css'
import { MoreVert } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { format } from "timeago.js";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Avatar from 'react-avatar';
import { MdThumbUpOffAlt, MdThumbUpAlt } from 'react-icons/md';

const Post = ({ post }) => {


    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const photo = PF + post?.photo;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])



    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }

        fetchUser();



    }, [post.userId])

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id })
        } catch (error) {

        }
        setLike((prevState) => isLiked ? prevState - 1 : prevState + 1)
        setIsLiked(!isLiked);
    }

    console.log(isLiked);

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user._id}`}>
                            <Avatar className='postProfileImg' size={40} src={user.profilePicture && PF + user.profilePicture} name={!user.profilePicture && user.username} />
                            {/* <img className='postProfileImg' src={user.profilePicture || PF + "person/noAvatar.png"} alt="" /> */}
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    {post.img && <img className='postImg' src={PF + post.img} alt="" />}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {isLiked ?
                            <div class="likedIcon" onClick={likeHandler}>
                                <MdThumbUpOffAlt size={16} className="text-primaryHeadline" />
                            </div>

                            :
                            <div class="dislikedIcon" onClick={likeHandler}>
                                 <MdThumbUpAlt size={16} className="text-mainPurple" />
                            </div>

                        }
                     
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Post