import React, { useEffect, useRef, useState } from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { sendMessageRoute } from "../utils/APIRouters";
import { useEffectAsync } from "../pages/Chat";
import { recieveMessageRoute } from "../utils/APIRouters";

const ChatContainer = ({ currentChat, currentUser, socket }) => {

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);


  useEffectAsync(async()=>{

    if(currentChat){
      const response = await axios.post(recieveMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      // console.log(response.data);
      setMessages(response.data);
    }
    
  }, [currentChat])

  const handlesendMsg  = async (msg)=>{
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  }

  useEffect (() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <div className="grid grid-rows-6 col-span-2 overflow-hidden mb-2 sm:grid-rows-15 md:grid-rows-10 lg:grid-rows-15">
          <div className="flex justify-between border-b-2 border-b-slate-700  h-20 p-0 sm:p-6">
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
          <Messages messages={messages} scrollRef={scrollRef}/>
          <ChatInput handleSendMsg={handlesendMsg}/>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
