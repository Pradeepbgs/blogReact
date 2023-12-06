import React from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../utils/authSlice'

export default function LogoutBtn() {
const dispatch = useDispatch()  

  const logoutBtn = () => {
    dispatch(logout())
  }

  return (
    <div>
      <button 
      onClick={logoutBtn}
      className='ml-9 px-6 py-2 rounded-full hover:bg-gray-200'>Logout</button>
    </div>
  )
}
