
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {   RouterProvider, createBrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import Home from './components/Home.jsx'
import {Login, Signup, AddPost, AllPost} from './components/index.js'
import store from './utils/store.js'



 const router = createBrowserRouter([
     {
      path:"/",
      element:<App/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/signup",
          element: <Signup/>,
        },
        {
          path:"/allpost",
          element: <AllPost/>
        },
        {
          path: 'addpost',
          element: <AddPost/>,
        }
      ]
     }
 ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
