import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({ convo }) => {

    const {selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === convo?._id;

    const {onlineUsers} = useSocketContext();
    console.log(onlineUsers);
    const isOnline = onlineUsers.includes(convo._id)

    return (
    <>
    
        <div className={`flex gap-2 items-center hover:bg-sky-500 rounded py-1 cursor-pointer ${isSelected ? 'bg-sky-500' : ""}`}
        onClick={()=>{setSelectedConversation(convo)}}
        >
   
            <div className={`avatar ${isOnline ? 'online' : ''} `}>
                <div className="w-12 rounded-full">
                    {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                    <img src={convo.profilePic} />
                </div>
            </div>

            <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-gray-200'> {convo.fullName }</p>
                    {/* <span className='text-xl'>😍</span> */}
                </div>
            </div>

        </div>
        <div>

        </div>
        <div className='divider my-0 py-0 h-1'></div>
    </>
  )
}

export default Conversation
