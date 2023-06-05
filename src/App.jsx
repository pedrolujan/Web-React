import { useState } from "react";
import Sidevar from "./components/shared/sidevar"
import { RiMenu3Fill,RiUser3Line,RiAddLine,RiLightbulbLine,RiCloseLine } from "react-icons/ri";

function App() {
  const [showMenu,setShowMenu]=useState(false);
  const [showOrder,setshowOrder]=useState(false);

  const toggleMenu=()=>{
    setShowMenu(!showMenu);
  }
  return (

    <div className="bg-[#282836] w-full min-h-screen ">
      <Sidevar  showMenu={showMenu}/>
      <nav className="bg-[#1F1D2A] lg:hidden text-gray-400 fixed text-3xl py-1 px-8 rounded-tl-xl rounded-tr-xl flex items-center justify-between  w-full bottom-0 left-0">
        <button className=""><RiUser3Line/></button>
        <button className=""><RiAddLine/></button>
        <button className=""><RiLightbulbLine/></button>
        <button onClick={toggleMenu} className="text-white  p-3">{showMenu?<RiCloseLine/>:<RiMenu3Fill/>}</button>
      </nav>
    </div>
  )
}

export default App
