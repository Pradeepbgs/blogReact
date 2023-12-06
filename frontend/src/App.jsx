import { Outlet } from "react-router-dom"
import {Header, Footer} from './components/index'


function App() {

  return (
    <>
     <div className="h-[100%] w-[100%]">
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
    </>
  )
}

export default App
