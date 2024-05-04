import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutBtn from './LogoutBtn'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-400 p-4 flex flex-col'>
        {/* serach */}
        <SearchInput/>
        {/* divider */}
        <div className='divider px-3'></div>
        {/* Users */}
        <Conversations/>
        {/* Logout Btn */}
        <LogoutBtn/>
    </div>
  )
}

export default Sidebar
