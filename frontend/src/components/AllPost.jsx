import axios from 'axios'
import React, { useEffect } from 'react'

export default function AllPost() {


  useEffect(() =>{
    axios.get('http://localhost:3000/allpost')
    .then(res => console.log(res.data, "res.data"))
  })

  return (
    <div>
      ALl Post
    </div>
  )
}
