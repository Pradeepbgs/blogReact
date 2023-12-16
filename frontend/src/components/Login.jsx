import React, { useState } from 'react';
import Input from './Input';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../utils/authSlice';

export default function Login() {
  const [error, setError] = useState("");
  const { register, handleSubmit , reset} = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function createUser(data){
    setError("")
    try {
        const user = await axios.post("http://localhost:3000/login", data);
        reset()
        console.log(user);
        dispatch(login(user.data));
        console.log(user.data);
        console.log("login success");
      navigate('/');
    } catch (error) {
      setError(error)
      reset()
      console.log("login error:", error.response?.data.error);
      throw error
      // Display an error message to the user
    }
  };
 

  return (
    <div className='w-[100%] h-[100%] flex justify-center mt-10' >
      <div className='bg-gray-300 px-20 py-10 text-center rounded-md'>
        <h2 className='text-3xl mb-5 font-semibold'>Login</h2>
        <p className='text-red-400'>{error.response?.data.error}</p>
        <div className=''>
          <form onSubmit={handleSubmit(createUser)} className='w-64'>
            <Input
              type='email'
              placeholder='Enter your Email'
              {...register('email')}
            />
            <Input
              type='password'
              placeholder='Enter your password'
              {...register('password')}
            />
            <button
              type='submit'
              className='bg-blue-500 px-[40%] py-3 text-white rounded-md'
            >
              Login
            </button>
            <p className='text-blue-600 mt-3'>
            <NavLink to='/signup' className=''>Create Account Signup</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
