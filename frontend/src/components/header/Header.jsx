import { name } from 'ejs'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    const names = [
        {
            name: "Home",
            url: "/"
        },
        {
            name: "All Post",
            url: "/allpost"
        },
        {
            name: "Add-Post",
            url: "/addpost"
        },
        {
            name: "Login",
            url:"/login"
        }
    ]
  return (
    <div>
      <nav className='bg-gray-300 flex justify-between items-center px-16 py-3 '>
        <ul>
            <li>LOGO</li>
        </ul>
        <ul className='flex'>
            {
                names.map((item,index)=>(
                    <NavLink to={item.url} key={index}>
                        <button className='ml-9 px-6 py-2 rounded-full hover:bg-gray-200'>{item.name}</button>
                    </NavLink>
                ))
            }
        </ul>
      </nav>
    </div>
  )
}
