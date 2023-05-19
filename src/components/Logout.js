import axios from "axios";
import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { logoutRoute } from "../utils/APIRouters";
import { Navigate } from "react-router-dom";

const Logout = () => {
//   const navigate = Navigate(); 
  const handleClick = async () => {
      localStorage.clear();
    // const id = await JSON.parse(
    //   localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    // )._id;
    // const data = await axios.get(`${logoutRoute}/${id}`);
    // if (data.status === 200) {
    //     localStorage.clear();
    //   navigate("/login");
    // }
    // navigate("/login");
  };
  return (
    <>
      <button onClick={handleClick} className="h-20">
        <BiLogOutCircle style={{ width: '5rem' }} />
      </button>
    </>
  );
};

export default Logout;
