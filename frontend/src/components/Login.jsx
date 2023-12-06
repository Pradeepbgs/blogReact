import React from 'react'

export default function Login() {
  return (
    <div className='mt-10 h-[100%] w-[100%] flex justify-center' >
      <div className=' bg-slate-400 h-52 py-20'>
        <div>
            Login
        </div>
        <div className=''>
            <input type="text" placeholder='Enter your name'/>
            <input type="text" placeholder='Email'/>
            <input type="text" placeholder='Password'/>
        </div>
      </div>
    </div>
  )
}
