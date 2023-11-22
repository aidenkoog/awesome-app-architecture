import React from 'react'
import Chat from './Chat'

const PIC_URL = 'https://lh3.googleusercontent.com/ogw/AAEL6sjMMXhkjCmKqDXWgtjPz6vPstkNQD73KKweFPe-lQ=s32-c-mo';

function Chats() {
    return (
        <div className='chats'>
            <Chat
                name="Person1"
                message="Hey Whats up!"
                timestamp="40 second ago"
                profilePic={PIC_URL}
            />
            <Chat
                name="Person2"
                message="yooo 🤩"
                timestamp="30 minutes ago"
                profilePic={PIC_URL}
            />
            <Chat
                name="Person3"
                message="Hi 🔥"
                timestamp="2 hour ago"
                profilePic={PIC_URL}
            />
            <Chat
                name="Person4"
                message="Chat us! 😎"
                timestamp="40 second ago"
                profilePic={PIC_URL}
            />
            <Chat
                name="Person5"
                message="Work 😴"
                timestamp="18 hour ago"
                profilePic={PIC_URL}
            />
        </div>
    )
}

export default Chats