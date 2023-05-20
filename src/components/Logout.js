import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const Logout = () => {

  const navigate = useNavigate(); 

  const handleClick =  () => {
      localStorage.clear();
    // const id = await JSON.parse(
    //   localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    // )._id;
    // const data = await axios.get(`${logoutRoute}/${id}`);
    // if (data.status === 200) {
    //     localStorage.clear();
    //   navigate("/login");
    // }
    navigate("/login");
  };
  return (
    <>
      <div type="button" onClick={handleClick} className="text-5xl text-white">
        <BiLogOutCircle  />
      </div>
    </>
  );
};

export default Logout;
