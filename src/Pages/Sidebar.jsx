import React, { Children, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./Sidebar.scss"
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
import { ImExit, ImUser } from "react-icons/im";
import {
    RiHome6Line,
    RiPercentLine,
    RiPieChartLine,
    RiMailLine,
    RiLogoutCircleRLine
} from "react-icons/ri"
import { Cookies } from 'react-cookie';
import { BsList } from "react-icons/bs";
import fileContent from "../assets/LeerAPI";



const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDesplegableVisible, setDesplegableVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    function getCookie(name) {
        const cookieString = document.cookie;
        const cookies = cookieString.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    const handleImagenUserClick = () => {
        setDesplegableVisible(!isDesplegableVisible);
    }


    // const toggle = () => setIsOpen(!isOpen);

    const [showMenu, setShowMenu] = useState(false);


    const toggleMenu = () => {

        setShowMenu(!showMenu);
    }

    const [activo, setActivo] = useState(0);

    const ocultarAutomatico = () => {
        if (showMenu && isOpen == false) {

            setShowMenu(false);
        }
    }
    const handleActive = (itemId) => {
        setActivo(itemId);
        setShowMenu(!showMenu);
    }
    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    const CerrarSesion = () => {
        deleteCookie("idAcceso");
        deleteCookie("idUsuario");
        deleteCookie("idPersonal");
        deleteCookie("cUsuario");
        deleteCookie("cPrimerNom");
        deleteCookie("cDocumento");
        deleteCookie("cDireccion");
        deleteCookie("cApePat");
        deleteCookie("cApeMat");
        window.location.href = "./";
    }

    //array para llanar a los formularios hijos
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
    useEffect(() => {
        async function fetchData() {
            try {
                const idUsuario = getCookie('idUsuario')
                const params = {
                    _idUsuario: idUsuario,
                };
                const baseurl = new URL(fileContent + "Personal/Perfil");
                baseurl.searchParams.append("_idUsuario", params._idUsuario);

                const response = await fetch(baseurl);
                const data = await response.json();
                if (data && data.result.btImgPerfil) {

                    // Eliminar caracteres no válidos de la cadena de base64
                    const cleanBase64 = data.result.btImgPerfil.replace(/[^A-Za-z0-9+/=]/g, '');

                    // Decodificar la cadena de base64
                    const decodedData = atob(cleanBase64);

                    // Crear un array de bytes a partir de los datos decodificados
                    const byteArray = new Uint8Array(decodedData.length);
                    for (let i = 0; i < decodedData.length; i++) {
                        byteArray[i] = decodedData.charCodeAt(i);
                    }

                    // Crear un objeto Blob a partir del array de bytes
                    const imageBlob = new Blob([byteArray], { type: 'image/png' });

                    // Crear una URL de objeto a partir del objeto Blob
                    const imageUrl = URL.createObjectURL(imageBlob);

                    setProfileImage(imageUrl);
                }

            } catch (error) {
                console.error("Error al obtener los datos de la API:", error);
            }
        }

        fetchData();
    }, []);


    return (
        <div className='bg-[#ecf1f1]  min-h-screen' onClick={ocultarAutomatico}>

            <div className={` bg-[#242527] z-50 fixed lg:left-0 top-0 w-40 h-full flex flex-col  justify-between py-1 
                    transition-all ${showMenu ? "lef-0" : "-left-full"} `} id='Sidebar' >
                <div className=' '>
                    <div className='text-2xl text-gray-300 uppercase font-bold text-center my-0' >
                        <img className='border-t-1 m-b-2' src='../src/image/LOGO_NEGRO.png' />
                    </div>
                    <hr className='mt-0.5' />

                    <div className='pl-0 w-auto '>
                        {
                            menuItem.map((item, index) => (
                                <NavLink to={item.path} key={index} className={`dvLetrasMenu flex w-auto  ${activo === index ? 'activo' : ''}`} onClick={() => handleActive(index)} >
                                    <div className={`dvItemMenu flex items-center group hover:bg-[#FF3B26] p-1 w-full group transition-colors `}   >

                                        <div className="icon flex text-[#FF3B26] m-0 w-auto group-hover:text-white transition-colors" >
                                            <span className='p-4 text-2xl'>
                                                {item.icon}
                                            </span>
                                        </div>

                                        <div className=" w-full  p-1 text-[#FF3B26]  group-hover:text-white transition-colors  ">
                                            <span>
                                                {item.name}
                                            </span>
                                        </div>
                                    </div>

                                </NavLink>
                            ))
                        }
                    </div>
                </div>
                {/* <div className=' '>
                    <ul className='pl-0 '>
                        <li className='hover:bg-[#dedefc] p-1  group transition-colors'>
                            <a href="#" className='group-hover:bg-[#FF3B26] p-1 flex rounded-lg justify-center text-[#FF3B26] group-hover:text-white transition-colors' >
                                <RiLogoutCircleRLine className='text-2xl  ' />
                            </a>
                        </li>
                    </ul>
                </div> */}
            </div>

            <div className=' lg:pl-40  w-full ' >
                <nav className="bg-[#FF3B26]  text-white fixed text-3xl py-2 px-0   lg:rounded-br-none flex items-center justify-between  w-full top-0 left-0 h-16">
                    <div className=' px-5'>
                        <button onClick={toggleMenu} className="  p-1 ml-2 text-4xl">{showMenu ? <BsList /> : <BsList />}</button>
                    </div>

                    <div className='bg-[#0000006e] flex rounded-l-full border-b-2 border-t-2 border-[#505050]' onClick={handleImagenUserClick}>
                        <div className='items-center'>
                            <img className='object-cover  cursor-pointer bg-[#100cee] border-2 border-[#505050] w-14 h-14 rounded-full border-solid' src={profileImage || '../src/image/PhotoUser.png'} />
                            <div className={`dvDesplegable w-32 ${isDesplegableVisible ? 'dvDesplegableActivo' : 'dvDesplegableInactivo'}`}>
                                <ul className='pl-3 pr-2 w-full'>
                                    <li className='text-base'>
                                        <i className="iconUser"><ImUser /></i>
                                        <a href="#" id="btnperfil" className=''>Perfil</a>
                                    </li>
                                    <li onClick={CerrarSesion} className='text-base'><i><ImExit /></i><a href="#">Salir</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <p className='text-sm mr-2 ml-2 cursor-pointer'>{getCookie('cPrimerNom')}</p>
                        </div>
                    </div>



                </nav>
                <div className=' w-70 right-0 pt-16'>
                    <div className='p-5'>
                        {children}
                    </div>

                </div>
            </div>



        </div>



    )
};
export default Sidebar;