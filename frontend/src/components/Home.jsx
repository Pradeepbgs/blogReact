import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../utils/authSlice'

function Home() {
const navigate = useNavigate()
const dispatch = useDispatch()
// axios.defaults.withCredentials = true;
useEffect(() => {
  axios.get('/api/user')
      .then(res => {
          console.log(res.data);
          if (res.data) {
              dispatch(login(res.data.user))
              navigate('/');
          } else {
              navigate('/login');
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
}, []);


  return (
    <>
    <div className='flex justify-center bg-gray-200 h-full'>
      <div className='mt-10'>
        home
      </div>
    </div>
    </>
  )
}

export default Home
