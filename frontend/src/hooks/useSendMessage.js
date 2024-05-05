import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);

    const { message, setMessage, selectedConversation } = useConversation();

    const sendMsg = async(msg)=>{
        setLoading(true)
        try {
            const response = await fetch(`/api/messages/send/${selectedConversation._id}`,{
                method:'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({message : msg})
            })

            const data = await response.json();

            console.log(data);

            if(data.error){
                throw new Error(data.error)
            }

            setMessage([...message, data])

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, sendMsg };
}

export default useSendMessage
