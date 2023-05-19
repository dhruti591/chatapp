import React from "react";
import Logout from "./Logout";

const ChatContainer = ({ currentChat }) => {
  return (
    <>
      {currentChat && (
        <div className="grid grid-rows-10 gap-0.1 overflow-hidden sm:grid-rows-15 md:grid-rows-10 lg:grid-rows-15">
          <div className="flex justify-between h-20 p-0 sm:p-2">
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
        </div>
      )}
    </>
  );
};

export default ChatContainer;
