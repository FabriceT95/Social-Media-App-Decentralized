import React, { useEffect, useState } from 'react'
import "./rightbar.css"
import Online from '../online/Online'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from '@material-ui/icons'
import Avatar from 'react-avatar';


const Rightbar = ({ user }) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([])
  const { user: currentUser, dispatch } = useContext(AuthContext);


  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        let friendList = {}
        if (user) {
          friendList = await axios.get("/users/friends/" + user._id);
        } else {
          friendList = await axios.get("/users/friends/" + currentUser._id);
        }
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();

  }, [user]);

  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", { userId: currentUser._id });
        dispatch({ type: "UNFOLLOW", payload: user._id })
      } else {
        await axios.put("/users/" + user._id + "/follow", { userId: currentUser._id })
        dispatch({ type: "FOLLOW", payload: user._id })
      }
      setFollowed(!followed);

    } catch (error) {
      console.log(error);
    }


  }



  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className='birthdayImg' src="/assets/gift.png" alt="" />
          <span className="birthdayText"><b>Pola Foster</b> and <b>3 other friends</b> have a birthday today</span>
        </div>
        <div className='rightbarFriends'>
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            {
              friends.map(friend => (<Online key={friend._id} user={friend} />))
            }

          </ul>
        </div>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (<>
      {user._id !== currentUser._id && (
        <button className="rightbarFollowButton" onClick={handleFollow}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
      <h4 className='rightbarTitle'>User information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
        </div>
      </div>
      <hr className='sectionSeparator' />
      <h4 className='rightbarTitle'>User friends
      </h4>
      <div className="rightbarFollowings">
        {friends.map(friend => (
          <Link key={friend.username} to={"/profile/" + friend._id} style={{ textDecoration: "none" }}>
            <div className="rightbarFollowing">
              <div className='rightbarFollowingCircle'>
                <Avatar name={friend.username} size={64} className="rightbarFollowingImg" />
              </div>
              {/* <img src={friend.profilePicture ? PF + friend.profilePicture : `${PF}person/noAvatar.png`} alt="" className="rightbarFollowingImg" /> */}
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          </Link>

        ))}



      </div>
    </>)
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar