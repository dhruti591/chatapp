import React, {  useState } from 'react';
import Logo from '../assets/logo.svg';
import { Link, useNavigate,  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRouters';

const Register = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    "username": "",
    "email": "",
    "password": "",
    "confirmPassword": "",
  })
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    // console.log(password+" " + confirmPassword+" " + username + email);
    if (password !== confirmPassword) {
      toast.error(
        "password and confirm password should be same.",
        toastOptions
      );
      return false;
    } 
     else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert('form submission');
    if(handleValidation())
    {
      console.log("validation", values);
      const { password, confirmPassword, username, email } = values;
      const {data} = await axios.post(registerRoute, {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        console.log('create user');
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
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
            type="email"
            placeholder="Email"
            name="email"
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
          <input
          className='p-2 border-4 text-lg bg-transparent hover:bg-blue-700 text-white cursor-pointer outline-none rounded'
            style={{"borderColor":"#4e0eff"}}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" className='px-4 py-2 bg-purple-700 text-white text-xl'>Create User</button>
          <span className='text-white'>
            Already have an account ? <Link to="/login" className='text-purple-500 text-xl'>Login.</Link>
          </span>
        </form>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Register
