import { Outlet } from "react-router-dom"
import {Header, Footer} from './components/index'


function App() {

  return (
    <>
     <div className="">
      <div className="bg-gray-100 h-[100vh]">
      <div>
        <Header/>
      </div>
      <div className="w-full h-full">
        <Outlet/>
      </div>
      <div>
        <Footer/>
      </div>
      </div>
     </div>
    </>
  )
}

export default App
