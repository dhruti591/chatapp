import React, { useEffect, useState } from "react";
import axios from "axios";
import loader from "../assets/loader.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRouters";

export  function useEffectAsync(effect, inputs) {
  useEffect(() => {
      effect();
  }, inputs); // eslint-disable-line react-hooks/exhaustive-deps
}

const SetAvatar = () => {
  const api = `http://127.0.0.1:5000`;

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffectAsync(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {

      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const image = `https://cdn.jsdelivr.net/gh/Nishant5789/My_Tech_Notes/asset/chatavatar${selectedAvatar}.png`
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image,  
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };


  useEffectAsync(async() => {  
    const res =  await axios.get(api + '/nishantapi/chatavatars');
    
    // console.log(res.data);
    const data = res.data.avatarUrls;
    setAvatars(data);
    // console.log(avatars);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  },[]);
 

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center bg-blue-700 h-screen">
          <img src={loader} alt="loader" className="" />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-12 bg-blue-700 h-screen w-screen">
          <div className="text-white text-4xl font-semibold text-shadow-md ">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="flex gap-x-2">
            {avatars.map((avatar, index) => {
              return (
                <div className={`w-44 p-4  rounded-full flex justify-center items-center transition duration-400 ease-in-out  
                  ${
                    selectedAvatar === index ? "border-4 border-purple-700" : ""
                  }`}>
                <img
                    src={avatar}
                    alt="avatar"
                    key={index}
                    onClick={() => {
                      setSelectedAvatar(index)
                      }}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="px-4 py-2 rounded-md shadow-md transition duration-800 ease-in-out hover:bg-purple-700  bg-purple-600 text-white text-xl">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  )
}

export default SetAvatar

