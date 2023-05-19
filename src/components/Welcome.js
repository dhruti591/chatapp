import React from 'react'
import Robot from '../assets/robot.gif'

const Welcome = ({currentUser}) => {
    console.log(currentUser);
  return (
     <div className='flex-col flex gap-1 justify-center items-center col-span-2' >
        <img src={Robot} className='h-56' alt="Robot" />
        <h1 className='text-white text-4xl font-bold'>Welcome, <span className='font-serif text-2xl text-blue-700'>{currentUser.username}</span></h1>
        <p className='text-white text-xl'>Please select a chat to start message</p>
     </div>
  )
}

export default Welcome
