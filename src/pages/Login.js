import React, {  useState } from 'react';
import Logo from '../assets/logo.svg';
import { Link, useNavigate,  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRouters';

const Login = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    "username": "",
    "password": "",
  })
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, username } = values;

    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert('form submission');
    if(handleValidation())
    {
      // console.log("validation", values);
      const { password, username } = values;
      const {data} = await axios.post(loginRoute, {
        username: username,
        password: password,
      });
      
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        console.log('login user');
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
          );
          navigate("/setAvatar");
      }
    }
  };

  const handleChange = (e) => { 
    setValues({...values, [e.target.name]:e.target.value});
    // setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className='bg-blue-800 flex justify-center items-center h-screen w-screen'>
         <form action="" className='bg-gray-800 border-none flex flex-col gap-y-3 rounded-lg px-20 py-12 border' onSubmit={(event) => handleSubmit(event)}>
          <div className="flex justify-center items-center gap-x-4">
            <img src={Logo} className='h-20'  alt="logo" />
            <h1 className='text-2xl text-white capitalize font-serif font-extrabold' >SNAPPY</h1>
          </div>
          <input
            className='p-2 border-4 text-lg bg-transparent hover:bg-blue-700 text-white cursor-pointer outline-none rounded'
            style={{"borderColor":"#4e0eff"}}
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
          className='p-2 border-4 text-lg bg-transparent hover:bg-blue-700 text-white cursor-pointer outline-none rounded'
            style={{"borderColor":"#4e0eff"}}
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" className='px-4 py-2 bg-purple-700 text-white text-xl'>Log in</button>
          <span className='text-white'>
            want to create Account ? <Link to="/register" className='text-purple-500 text-xl'>Register.</Link>
          </span>
        </form>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Login
