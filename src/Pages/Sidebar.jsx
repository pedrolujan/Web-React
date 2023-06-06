import React, { Children, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiMenu3Fill, RiUser3Line, RiAddLine, RiLightbulbLine, RiCloseLine } from "react-icons/ri";
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
} from "react-icons/fa";
import {
    RiHome6Line,
    RiPercentLine,
    RiPieChartLine,
    RiMailLine,
    RiLogoutCircleRLine
} from "react-icons/ri"


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showOpenResp, setIsOpenResp] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [showMenu, setShowMenu] = useState(false);


    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }
    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/clientes",
            name: "Clientes",
            icon: <FaUserAlt />
        },
        {
            path: "/productos",
            name: "Productos",
            icon: <FaShoppingBag />
        }
    ]
    return (
        <div className='bg-[#100f16] flex min-h-screen'>

            <div className={`bg-[#4327df] z-50 fixed lg:left-0 top-0 w-30 h-full flex flex-col justify-between py-1 rounded-tr-lg rounded-br-lg
                    transition-all ${showMenu ? "lef-0" : "-left-full"}`}>
                <div>
                    <h1 className='text-2xl text-gray-300 uppercase font-bold text-center my-5'>Logo</h1>
                    <ul className='pl-4'>
                        {
                            menuItem.map((item, index) => (
                                <NavLink to={item.path} key={index} className="dvLetrasMenu" >
                                    <div className={isOpen == true ? 'dvItemMenu' : 'dvItemMenu '} >
                                        <div style={{ marginRight: '5px' }} className="icon" >{item.icon}</div>
                                        <div style={{ marginLeft: '10px', display: isOpen ? "flex" : "none" }} className=" ml-5">
                                            {item.name}
                                        </div>
                                    </div>
                                </NavLink>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <ul className='pl-4'>
                        <li className='hover:bg-[#282836] p-4 rounded-tl-xl rounded-bl-xl group transition-colors'>
                            <a href="#" className='group-hover:bg-[#DD826F] p-4 flex rounded-lg justify-center text-[#DD826F] group-hover:text-white transition-colors' >
                                <RiLogoutCircleRLine className='text-2xl  ' />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className=' lg:ml-32  w-full  bg-green-600'>
                <nav className="bg-[#410a35]  text-gray-400 fixed text-3xl py-1 px-8 rounded-bl-xl rounded-br-xl lg:rounded-br-none flex items-center justify-between  w-full top-0 left-0">
                    <button className=""><RiUser3Line /></button>
                    <button className=""><RiAddLine /></button>
                    <button className=""><RiLightbulbLine /></button>
                    <button onClick={toggleMenu} className="text-white  p-3">{showMenu ? <RiCloseLine /> : <RiMenu3Fill />}</button>
                </nav>
                <div className='bg-red-400   w-70 right-0 pt-10'>
                    {children}
                </div>
            </div>



        </div>



    )
};
export default Sidebar;