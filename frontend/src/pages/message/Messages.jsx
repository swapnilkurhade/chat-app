import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import useListenMessages from '../../hooks/useListenMessages'

const Messages = () => {

  useListenMessages()
  const {loading, message } = useGetMessages();
  const lastMsgRef = useRef();

  useEffect(()=>{
    setTimeout(()=>{
      lastMsgRef.current?.scrollIntoView({ behavior : "smooth"})
    },100)
  },[message])

  return (
    <div className='px-4 flex-1 overflow-auto'>

      {
        !loading && message.length > 0 && 
        message.map((msg)=>(
          <div key={msg._id} ref={lastMsgRef}>
            <Message msg={msg}/>
          </div>
        ))
      }

      {
        loading ? <span className='loading loading-spinner mx-auto'></span> : null
      }

      {
        !loading && message.length === 0 && <p className='text-center text-slate-50'>Send Message to start the conversation...</p>
      }

    </div>
  )
}

export default Messages
