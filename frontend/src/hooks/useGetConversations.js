import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetConversations = () => {

    const [loading ,setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(()=>{
        getConvo()
    },[])

    const getConvo = async() =>{
        setLoading(true)
        try {
            const response = await fetch('/api/users');
            const data = await response.json();

            if(data?.error){
                throw new Error(data.error)
            }

            setConversations(data)

        } catch (error) {
            toast.error(error.message)            
        } finally{
            setLoading(false)
        }
    }

    return { loading, conversations};

}

export default useGetConversations
