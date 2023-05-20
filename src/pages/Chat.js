import axios from "axios";
import React, { useEffect, useState } from "react";
import { allUsersRoute } from "../utils/APIRouters";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

export function useEffectAsync(effect, inputs) {
  useEffect(() => {
    effect();
  }, inputs); // eslint-disable-line react-hooks/exhaustive-deps
}
const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoded, setIsLoded] = useState(false);

  useEffectAsync(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
    else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
      setIsLoded(true);
    }
  }, []);

  useEffectAsync(async () => {
    // console.log(currentUser);
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const res = await axios.get(allUsersRoute + `/${currentUser._id}`);
        console.log(res.data);
        setContacts(res.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };


  return (
    <>
      <div class="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-red-900">
        <div className="h-4/5 bg-gray-600 w-4/5 bg-opacity-70 grid grid-cols-2  sm:grid-cols-3">
            <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}  />
            {isLoded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat}  />
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
