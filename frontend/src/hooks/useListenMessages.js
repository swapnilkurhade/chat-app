import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';

const useListenMessages = () => {
    
    const { socket } = useSocketContext();
    const { message, setMessage } = useConversation();

    useEffect(()=>{
        socket?.on('newMessage',(newMessage)=>{
            setMessage([...message, newMessage])
        })

        return ()=>{
            socket.off('newMessage')
        }
    },[socket, setMessage, message])

}

export default useListenMessages
