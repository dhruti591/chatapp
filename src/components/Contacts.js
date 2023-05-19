import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.svg';


export  function useEffectAsync(effect, inputs) {
    useEffect(() => {
        effect();
    }, inputs); // eslint-disable-line react-hooks/exhaustive-deps
  }

const Contacts = ({contacts, currentUser, changeChat}) => {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(()=>{
        console.log(currentUser);
        if(currentUser){
            setCurrentUserName(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
        }
    },[currentUser])

    const changeCurrentChat = (index, contact) => {
        console.log(index);
        setCurrentSelected(index);
        changeChat(contact);
      };
    

  return (
    <>
    {currentUserImage && currentUserImage && (
      <div className='grid grid-rows-[10%,75%,15%] overflow-hidden pt-4 bg-indigo-900'>
        <div className="flex items-center gap-6  justify-center">
          <img src={Logo} className='h-12 ' alt="logo" />
          <h3 className='text-white uppercase text-3xl font-bold'>snappy</h3>
        </div>
        <div className="flex flex-col mt-3 items-center overflow-auto gap-2">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className='bg-white bg-opacity-25 h-20 cursor-pointer w-11/12  rounded-md px-2 flex items-center gap-4 transition duration-500 ease-in-out'
                style={index === currentSelected ? {backgroundColor: "#8A2BE2"} : {}}
                onClick={()=>{
                    changeCurrentChat(index, contact)
                }}
              >
                <div className="">
                  <img
                    src={contact.avatarImage}
                    alt="no contact avatar"
                    className='h-12 max-w-full'
                  />
                </div>
                <div className="">
                  <h3 className='text-white text-2xl font-bold'>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-indigo-900 flex justify-center items-center gap-x-8">
          <div className="">
            <img
              src={currentUserImage}
              alt="avatar"
              className='h-16'
            />
          </div>
          <div className="">
            <h2 className='text-white text-2xl font-semibold'>{currentUserName}</h2>
          </div>
        </div>
      </div>
    )}
  </>
  )
}

export default Contacts
