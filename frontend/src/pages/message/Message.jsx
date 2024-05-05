import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';

const Message = ({msg}) => {

  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = msg.senderId === authUser._id;

  return (
    <div>      
      <div className={`chat ${fromMe ? 'chat-end' : 'chat-start'}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
            <img alt="profile" src={`${fromMe ? authUser.profilePic : selectedConversation.profilePic}`} />
            </div>
        </div>
        <div className={`chat-bubble ${fromMe ? 'bg-blue-500' : ''}`}>{msg.message}</div>
        <div className="chat-footer opacity-50">
            {  new Date(msg.createdAt).toLocaleTimeString() }
        </div>
    </div>
        
    </div>
  )
}

export default Message
