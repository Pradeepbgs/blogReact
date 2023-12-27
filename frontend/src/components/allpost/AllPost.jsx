import axios from 'axios'
import React, { useEffect } from 'react'
import PostPage from './PostPage'

export default function AllPost() {

  // here we will fetch all the post from the database and display it on the page

  return (
    <div className='flex flex-wrap bg-gray-300'>
      <PostPage/>
    </div>
  )
}
