import React, { useState } from 'react'
import './sidebar.css'
import { Bookmark, CalendarToday, Chat, GolfCourse, Group, PlayCircleFilled, QuestionAnswerRounded, RssFeed, Work } from "@material-ui/icons"
import CloseFriend from '../closeFriend/CloseFriend'
import { Link } from 'react-router-dom'

const Sidebar = ({ selected, isHome }) => {

    const [activeId, setActiveId] = useState(selected)

    const handleClick = (e) => {
        setActiveId(e.currentTarget.id);
    }

    return (
        <div className={`sidebar ${isHome && 'sidebarHeight'}`}>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <Link to="/">
                        <li id="feed" className={`sidebarListItem ${activeId === "feed" ? 'activeItem' : 'inactiveItem'}`} onClick={handleClick}>
                            <RssFeed className='sidebarIcon' />
                            <span className="sidebarListItemText">
                                Feed
                            </span>
                        </li>
                    </Link>
                    <Link to="/messenger">
                        <li id="chat" className={`sidebarListItem ${activeId === "chat" ? 'activeItem' : 'inactiveItem'}`} onClick={handleClick}>
                            <Chat className='sidebarIcon' />
                            <span className="sidebarListItemText">
                                Chat
                            </span>
                        </li>
                    </Link>
                    <li id="play" className={`sidebarListItem ${activeId === "play" ? 'activeItem' : 'inactiveItem'}`} onClick={handleClick}>
                        <PlayCircleFilled className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Play
                        </span>
                    </li>
                    <li id="group" className={`sidebarListItem ${activeId === "group" ? 'activeItem' : 'inactiveItem'}`} onClick={handleClick}>
                        <Group className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Group
                        </span>
                    </li>
                    <li id="bookmarks" className={`sidebarListItem ${activeId === "bookmarks" ? 'activeItem' : 'inactiveItem'}`} onClick={handleClick}>
                        <Bookmark className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Bookmarks
                        </span>
                    </li>
                    <li id="question" className={`sidebarListItem ${activeId === "question" ? 'activeItem' : 'inactiveItem'}`} onClick={handleClick}>
                        <QuestionAnswerRounded className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Questions
                        </span>
                    </li>
                    <li id="jobs" className={`sidebarListItem ${activeId === "jobs" ? 'activeItem' : 'inactiveItem'}`} onClick={handleClick}>
                        <Work className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Jobs
                        </span>
                    </li>
                    <li id="events" className={`sidebarListItem ${activeId === "events" ? 'activeItem' : 'inactiveItem'}`} onClick={handleClick}>
                        <CalendarToday className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Events
                        </span>
                    </li>
                    <li id="courses" className={`sidebarListItem ${activeId === "courses" ? 'activeItem' : 'inactiveItem'}`} onClick={handleClick}>
                        <GolfCourse className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Courses
                        </span>
                    </li>
                </ul>
                {/*   <button className="sidebarButton">Show More</button> */}
                <hr className='sidebarHr' />
                <ul className="sidebarFriendList">
                    {/*  {Users.map(user => (<CloseFriend key={user.id} user={user} />))}  */}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar