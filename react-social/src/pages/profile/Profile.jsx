import React, { useState, useEffect } from 'react'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './profile.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Avatar from 'react-avatar';

const Profile = () => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({})
    const userId = useParams().userId;


    useEffect(() => {
        console.log('In UseEffect Profile' + userId);
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${userId}`);
            console.log(res.data)
            setUser(res.data);
        }

        fetchUser();



    }, [userId])


    return (
        <div className='mainContainer'>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className='profileCoverImg' src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.png"} alt="" />
                            {/* <img className='profileUserImg' src={user.profilePicture ? PF+user.profilePicture : PF + "person/noAvatar.png"} alt="" /> */}
                            <div className='absolute left-0 right-0 object-cover m-auto rounded-full w-36 h-36 top-36'>
                                <Avatar name={user.username} size={144} className="border-2 border-white border-solid rounded-full shadow-xl" />
                            </div>
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <span className='profileInfoDesc'>{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed userId={userId} />
                        <Rightbar user={user} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Profile