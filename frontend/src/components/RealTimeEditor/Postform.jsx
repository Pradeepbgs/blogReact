import React from 'react'
import Input from '../Input'
import { useForm } from 'react-hook-form'
import RTE from './RTE'

const Postform = () => {

    const {register, handleSubmit, control, getValues} = useForm()


  return (
    <div className='w-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
     items-center justify-center py-6 px-10'>
        <div className='bg-gray-300 bg-opacity-30 px-10 py-5'>
      <form action="" className=''>
        <div className='flex justify-between'> 
            <div className='flex flex-col mr-10'>
            <Input
             type="text"
             placeholder="Title"
             name="title"
             className="mb-4 py-3 rounded-md text-center"
             {...register('title', {required: true})}
            />
            <Input
             type="file"
             placeholder="choose a image"
             name="file image"
             accept="image/png, image/jpg, image/jpeg, image/gif"
             className="mb-4 mt-10 cursor-pointer"
             {...register('image')}
            />
             <button 
            className='bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-10'
            type='submit'>Submit</button>
            </div>
            <div className=' w-[45vw]'>
            <RTE
              name='content'
              label='content:'
              control={control}
              defaultValue={getValues('content')}
            />
            </div>
        </div>
           
      </form>
      </div>
    </div>
  )
}

export default Postform
