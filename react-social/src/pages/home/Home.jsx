import React from 'react'
import Feed from '../../components/feed/Feed'
import OnlineFriendsHorizontal from '../../components/onlineFriendsHorizontal/OnlineFriendsHorizontal'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './home.css';

const Home = () => {
  return (
    <div className='mainContainer'>
      <Topbar />
      <div className="homeContainer">
        <Sidebar selected="feed" isHome={true} />
        <div className="mobileFeedContainer">
          <OnlineFriendsHorizontal />
          <Feed />
        </div>

        <Rightbar />
      </div>

    </div>
  )
}

export default Home