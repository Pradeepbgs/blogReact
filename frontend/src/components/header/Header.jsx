import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

export default function Header() {

    const authStatus = useSelector(state => state.auth.status)

    const names = [
        {
            name: "Home",
            url: "/",
            active: true
        },
        {
            name: "All Post",
            url: "/allpost",
            active: authStatus
        },
        {
            name: "Add-Post",
            url: "/addpost",
            active: authStatus
        },
        {
            name: "Login",
            url:"/login",
            active: !authStatus
        }
    ]
  return (
    <div>
      <nav className='bg-gray-300 flex justify-between items-center px-16 py-3 '>
        <ul>
            <li><NavLink to="/">LOGO</NavLink></li>
        </ul>
        <ul className='flex ml-auto'>
            {
                names.map((item,index)=> item.active? (
                    <NavLink to={item.url} key={index}>
                        <button className='ml-9 px-6 py-2 rounded-full hover:bg-gray-200'>{item.name}</button>
                    </NavLink>
                ): null )
            }

           {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
        </ul>

      </nav>
    </div>
  )
}
