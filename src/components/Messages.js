import React from "react";
import { v4 as uuidv4, v4 } from "uuid";

const Messages = ({ messages, scrollRef }) => {
  return (
    <div className="row-span-5  mx-8 mt-8  overflow-auto">
      {messages.map((message) => {
        return (
          <div ref={scrollRef} key={uuidv4()}>
              <div className={`flex my-4 ${
                  message.fromSelf ? "justify-end" : "justify-start"
                }`}
              >
              {/* sm:w-56 md:w-72 lg:w-96 */}
                <div className={`bg-purple-600 max-w-[20rem] text-white shadow-md shadow-slate-500 hover:bg-purple-500  px-3 py-2
                ${ message.fromSelf ? "rounded-l-lg rounded-br-lg" : "rounded-r-lg rounded-bl-lg"}`}>
                  <p>{message.message} .</p>
                </div>
              </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
