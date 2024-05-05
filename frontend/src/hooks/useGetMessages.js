import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { setMessage, message, selectedConversation } = useConversation();

    useEffect(()=>{
        if(selectedConversation?._id){
            getMsg()
        }
    },[selectedConversation?._id, setMessage])

    const getMsg = async() =>{
        setLoading(true)

        try {
            const response = await fetch(`/api/messages/${selectedConversation._id}`);
            const data = await response.json();
            if(data.error){
                throw new Error(data.error)
            }
            setMessage(data)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, message };
}

export default useGetMessages
