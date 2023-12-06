import React, { useState } from 'react';
import Input from './Input';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../utils/authSlice';

export default function Login() {
  const [isSignInForm, setIsSignInForm] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function createUser(data){
    try {
      if (!isSignInForm) {
        const user = await axios.post("http://localhost:3000/login", data);
        dispatch(login({...user.data.user, password: "its secret", email:"its secret", _id: "pata nahi"}));
        console.log(user.data.user);
        console.log("signup success");
      } else {
        // Handle login form
      }
      navigate('/');
    } catch (error) {
      console.log("signup error:", error.response?.data.error);
      // Display an error message to the user
    }
  };

  return (
    <div className='w-[100%] h-[100%] flex justify-center mt-10' >
      <div className='bg-gray-300 px-20 py-10 text-center rounded-md'>
        <h2 className='text-3xl mb-5 font-semibold'>{isSignInForm ? "Login" : "Register"}</h2>
        <div className=''>
          <form onSubmit={handleSubmit(createUser)} className='w-64'>
            {!isSignInForm && <Input
              type="text"
              placeholder='FullName'
              {...register('name')}
            />}
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
              {isSignInForm ? "Sign" : "Register"}
            </button>
            <p>{isSignInForm? "Create Account" : ""}</p>
          </form>
        </div>
      </div>
    </div>
  );
}
