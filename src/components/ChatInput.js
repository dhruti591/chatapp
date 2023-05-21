import React, { useState } from 'react'
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

const ChatInput = ({handleSendMsg}) => {

    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = () => {
      setShowEmojiPicker(!showEmojiPicker);
    };
  
    const handleEmojiClick = (event, emojiObject) => {
      let message = msg;
      message += emojiObject.emoji;
      setMsg(message);
    };
  
    const sendChat = (event) => {
      event.preventDefault();
      if (msg.length > 0) {
        handleSendMsg(msg);
        setMsg("");
      }
    };
  return (
    <div className='flex py-4 items-center justify-center '>
        <div className="text-white  h-10">
            <div className="text-4xl flex-col px-2">
              <BsEmojiSmileFill className='' onClick={handleEmojiPickerhideShow}  />
              {showEmojiPicker && <Picker  onEmojiClick={handleEmojiClick} />}
            </div>
      </div>
      <form className="w-full rounded-2xl flex h-10 px-2 bg-white bg-opacity-20" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          className="bg-transparent flex-grow   text-white border-none  text-lg focus:outline-none" 
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
        <div className='text-2xl text-white'>
          <IoMdSend  />
        </div>
        </button>
      </form>
    </div>
  )
}

export default ChatInput
