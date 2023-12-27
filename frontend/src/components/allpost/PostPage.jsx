import React from 'react'

const PostPage = ({
  title= "title",
  img,
}) => {
  return (
    <div className='mt-10 ml-10 bg-gray-200 w-fit px-2 py-1 rounded-lg'>
      <div className='text-center'>
        <img
        className=' w-60 rounded-lg' 
        src={img} alt="" />
        <p className='font-semibold mt-1'>{title}</p>
      </div>
    </div>
  )
}

export default PostPage
