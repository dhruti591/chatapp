import React, { useState } from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { sendMessageRoute } from "../utils/APIRouters";

const ChatContainer = ({ currentChat }) => {

  const [messages, setMessages] = useState([]);

  const handlesendMsg  = async (msg)=>{

    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);

  }
  return (
    <>
      {currentChat && (
        <div className="grid grid-rows-6 col-span-2 overflow-hidden sm:grid-rows-15 md:grid-rows-10 lg:grid-rows-15">
          <div className="flex justify-between  h-20 p-0 sm:p-6">
            <div className="flex items-center gap-1">
              <div className="avatar">
                <img
                  className="w-16"
                  src={currentChat.avatarImage}
                  alt="avatar"
                />
              </div>
              <div className="text-white text-xl">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <Messages/>
          <ChatInput handleSendMsg={handlesendMsg}/>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
