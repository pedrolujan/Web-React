import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SidebarItems } from '../Funcions/Fun_Globales';
import "./Sidebar.scss"
import { User } from "../Class/Clases"
import { ImExit, ImUser } from "react-icons/im";
import { Cookies } from 'react-cookie';
import { BsList } from "react-icons/bs";
import fileContent from "../assets/LeerAPI";
import { GoArrowRight, GoChevronDown } from "react-icons/go";
import { FaViber, FaUserPlus, FaShareSquare } from "react-icons/fa";
import { BsBagCheckFill, BsFillQuestionDiamondFill } from "react-icons/bs";
import { RiArchiveFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiSearch2Fill } from "react-icons/ri";

//Funcion cookie para almanecar datos que se encuentran en la cookies
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

//Array de iconos para Acceso Directo
const InconAccesoDirecto = (codigo) => {
    let Icono = null; // Cambiamos la declaración a 'let'

    if (codigo === "8888500002") {
        Icono = <FaShareSquare />;
    } else if (codigo === "8888500001") {
        Icono = <FaUserPlus />;
    } else if (codigo === "8888500003") {
        Icono = <RiArchiveFill />;
    } else if (codigo === "8888500013") {
        Icono = < IoLogoWhatsapp />;
    } else if (codigo === "8888500004") {
        Icono = < BsBagCheckFill />;
    } else if (codigo === "8888500009") {
        Icono = <RiSearch2Fill />;
    } else if (codigo === "8888500012") {
        Icono = <BsFillQuestionDiamondFill />
    } else if (codigo === "8888500005") {
        Icono = <BsFillQuestionDiamondFill />
    }
    return Icono;
}

//   console.log(LlenarSidebarResult.result)
const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDesplegableVisible, setDesplegableVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [itemsMenu, setItemsMenu] = useState([]);
    const [menuGeneral, setMenuGeneral] = useState([])
    const [activePadre, setActivePadre] = useState("-01");
    const [resultAccesosDirecto, setResultAccesosDirecto] = useState([]);
    const [datosPersonales, setDatosPersonales] = useState([]);
    //state de Sidebar MenuPadre, submenu, hijo
    const { pathname } = useLocation();
    const [subMenuOpen, setSubMenuOpen] = useState("");
    const [subSubMenuOpen, setSubSubMenuOpen] = useState(false);
    const [desplegarSubmenu, setDesplegarSubmenu] = useState("0");
    const [activoDash, setActivoDash] = useState("-01");

    //EnviarDatos de usuario a Area de Trabajo
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/usuario`, { state: datosPersonales });
    };


    const fnActivarDesplegarMenu = (id) => {
        if (desplegarSubmenu == id) {

            setDesplegarSubmenu("0")
        } else {

            setDesplegarSubmenu(id)
        }
        // console.log(id);

    }

    const fnocultarAutomatico = () => {

        if (showMenu && isOpen == false) {

            setShowMenu(false);
        }
    }

    const fnhandleActiveDash = (itemId) => {
        setActivoDash(itemId);

        setShowMenu(!showMenu);
    }

    const fnhandleActiveDashSubMenuOpen = (itemId) => {
        if (subMenuOpen === itemId) {

            setSubMenuOpen("itemId");
        } else {
            setSubMenuOpen(itemId);
        }

        //  setShowMenu(!showMenu);
    }

    const fnhandleOcultarDashboard = (itemId) => {
        setActivoDash(itemId);
        if (itemId === '00000') {
            setShowMenu(!showMenu);

        }
        // console.log(itemId);

    }

    //funcion para llamar al Menu
    const fnhandleActiveDashPadre = (id) => {
        setActivePadre(id);
    }

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

    const fnhandleImagenUserClick = () => {
        setDesplegableVisible(!isDesplegableVisible);
    }

    const fntoggleMenu = () => {
        let estadoOculto = !showMenu;
        setShowMenu(estadoOculto);

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



    // Obtener la cookie del usuario
    let CookieUsuario = getCookie('idUsuario');


    // Llamar a la función SidebarItems y utilizar el resultado
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
                const dataArray = Array.isArray(data.result) ? data.result : [data.result];

                setDatosPersonales(dataArray)

                const dataUser = dataArray.map((usuario) => {
                    return new User(
                        usuario.cApeMat,
                        usuario.cApePat,
                        usuario.cDireccion,
                        usuario.cDocumento,
                        usuario.cPrimerNom,
                        usuario.cUsuario
                    );
                });
                // console.log(datosPersonales);
                // console.log(dataUser);
                if (data && data.result.btImgPerfil) {
                    //  console.log(data);
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

        // Mapeo y rutas para el funcionamiento de Sidebar con Menu-SubMenu-SubMenuHijos
        SidebarItems(CookieUsuario, 1)
            .then((data) => {
                // console.log(data);
                //Llenar SetMenuGeneral con todos los datos
                setMenuGeneral(data.result);

                let resultadosFiltrados = data.result.filter((item) => item.cMenuPadre === "0" && item.cMenuCod !== "8888500000");
                let resultadosFiltradosAccesoDirecto = data.result.filter((item) => item.cMenuPadre === "8888500000");
                // console.log(resultadosFiltradosAccesoDirecto);

                let AccesosDirectos = [];
                resultadosFiltradosAccesoDirecto.map((resultAccesos) => {
                    AccesosDirectos.push({
                        id: resultAccesos.cMenuCod.toString(),
                        path: "/" + resultAccesos.path,
                        name: resultAccesos.cMenuNombre
                    })
                })
                if (resultAccesosDirecto.length === 0) {
                    setResultAccesosDirecto(AccesosDirectos)
                    // console.log(AccesosDirectos);
                }
                let menuItem = [{
                    id: "-01",
                    path: "/dashboard",
                    name: "Dashboard",
                    // icon: <FaTh />,
                }];
                resultadosFiltrados.map((i) => {
                    menuItem.push({
                        id: i.cMenuCod.toString(),
                        path: i.path,
                        name: i.cMenuNombre,
                        menus: data.result.filter((s) => s.cMenuPadre.toString() === i.cMenuCod.toString())
                            .map((smenu) =>
                            (
                                {
                                    id: smenu.cMenuCod.toString(),
                                    path: "/" + smenu.path,
                                    name: smenu.cMenuNombre,
                                    submenus: data.result.filter((m) => m.cMenuPadre.toString() === smenu.cMenuCod.toString())
                                        .map((submenu) =>
                                        (
                                            {
                                                id: submenu.cMenuCod.toString(),
                                                path: "/" + submenu.path,
                                                name: submenu.cMenuNombre,
                                            }
                                        ))
                                }
                            ))
                    })

                });

                //   setItemsMenu(additionalItem)
                if (itemsMenu.length === 0) {
                    setItemsMenu(menuItem)
                }
                // console.log(menuItem);
                // console.log(menuItems);
            })
            .catch((error) => {
                console.error("Error al obtener los datos del Sidebar:", error);
            });

        fetchData();
    }, []);


    return (
        // Area de Trabajo
        <div className='bg-[#e5e5e5] overflow-auto min-h-screen' >

            {/* ContenedorGeneral Sidebar */}
            <div className={` bg-[#2d3035] z-50 fixed lg:left-0 top-0 w-52 h-full flex flex-col  justify-between py-1 
                    transition-all  text-lg ${showMenu ? "lef-0" : "-left-full"} `} id='Sidebar'  >
                <div className=' '>
                    <div className='text-2xl text-gray-300 uppercase font-bold text-center my-0   ' >
                        <img className='border-t-1 m-b-2 px-6 py-3' src='/src/image/LOGO.png' />
                    </div>
                    {/* <hr className='mt-0.5' /> */}
                    <div className="dvScroll pl-0 w-auto overflow-y-auto h-screen pb-20 ">
                        {itemsMenu.filter((item) => item.cMenuCod !== "8888500000")
                            .map((item) => (
                                <div key={item.id} className={` flex flex-col gap-1  `} onClick={() => fnhandleActiveDashPadre(item.id)} >
                                    <li className={`link   p-0 flex  ${activePadre == item.id ? "activoPadre" : ""} ${pathname.includes(item.name) && ""}`}
                                        onClick={() => fnhandleActiveDashSubMenuOpen(item.id)}>
                                        {item.id === "-01" ? (
                                            <NavLink to={item.path} className={` w-full p-2 pl-3 `}
                                                onClick={() => fnhandleOcultarDashboard("00000")}  >
                                                {item.name}
                                            </NavLink>
                                        ) : (
                                            <>
                                                <div className={` link flex-1 cursor-pointer  ${activePadre == item.id ? "activoPadre" : ""}`}>
                                                    <p className=" capitalize flex-1 "
                                                    >
                                                        {item.name}
                                                    </p>
                                                    <GoChevronDown
                                                        className={` ${subMenuOpen == item.id && "rotate-180"}  duration-200   cursor-pointer  `}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </li>
                                    <motion.ul
                                        key={item.id}
                                        animate={subMenuOpen == item.id ? { height: "fit-content" } : { height: 0 }}
                                        className={`flex h-0 flex-col cursor-pointer text-[0.8rem] font-normal  text-[#f14b09]  bg-[#1b1818] `}
                                    >
                                        {item.menus?.map((menu) => (
                                            <ul key={menu.id} className={`  flex  flex-col  m-0 text-base font-normal overflow-hidden ${desplegarSubmenu == menu.id ? "activoSubMenu" : ""} ${pathname.includes(item.name) && ""}`} onClick={() => setSubSubMenuOpen(!subSubMenuOpen)}>

                                                <li className={`flex p-2 pl-5 ${activePadre == menu.id ? "activoPadre" : ""}`} onClick={() => fnActivarDesplegarMenu(menu.id)}>
                                                    <p className="flex-1  capitalize "  >{menu.name}</p>
                                                    <GoChevronDown
                                                        className={` ${desplegarSubmenu === menu.id && "rotate-180"} duration-200  `}
                                                    />
                                                </li>
                                                <div className={`flex flex-col m-0 text-[0.8rem] font-normal  bg-[#0a0a0a] `}>
                                                    <motion.ul key={menu.id} animate={desplegarSubmenu === menu.id ? { height: "fit-content", } : { height: 0, }}
                                                        className={` `}
                                                    >
                                                        {
                                                            menu.submenus?.map((subm) => (

                                                                <div key={subm.id}>
                                                                    <NavLink to={item.path + menu.path + subm.path} className={`link  capitalize text-sm bg-[#131111] ${activoDash === subm.id ? "activoHijo" : ""} `} onClick={() => fnhandleActiveDash(subm.id)}>< GoArrowRight />
                                                                        {subm.name}
                                                                    </NavLink>

                                                                </div>
                                                            ))
                                                        }
                                                    </motion.ul>
                                                </div>
                                            </ul>
                                        ))}
                                    </motion.ul>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* Contenedor General Header */}
            <div className=' lg:pl-52  w-full  ' >
                {/* Contenedor de accesos Directos */}
                <nav className="dvHeader bg-[#ffffff]  text-[#3b3b3b] fixed text-3xl py-2 px-0   lg:rounded-br-none flex items-center justify-between  w-full top-0 left-0 h-16">
                    <div className=' '>
                        <button onClick={fntoggleMenu} className="  p-1 ml-2 text-4xl">{showMenu ? <BsList /> : <BsList />}</button>
                    </div>
                    <div className='w-1/2 lg:w-4/5 dvScrollAD flex lg:pl-28 pl-1 overflow-auto    p-0 text-xs lg:justify-center '>
                        {resultAccesosDirecto.map((ad) => (
                            <div key={ad.id} className='  pr-2 flex items-center text-black'>
                                <div className='bg-[#e5e5e5c7] rounded-md w-20 lg:w-28 p-1 flex justify-center'>
                                    <NavLink to={ad.path} >
                                        <div>
                                            <span className='text-black text-xl flex justify-center pb-1'>
                                                <h1>{InconAccesoDirecto(ad.id)}</h1>
                                            </span>
                                            <div className=' block w-full p-1 '>
                                                <span className=''>
                                                    {ad.name.slice(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    {/* Contenedor de Usuario */}
                    <div className='w-auto flex' onClick={fnhandleImagenUserClick}>
                        <div className='cursor-pointer flex rounded-l-full border-[#505050]  ml-0.5 w-auto'>

                            <img id='ImgUserPerfil' className='  cursor-pointer border-2 border-[#FF3B26]  rounded-full border-solid ' src={profileImage || '../src/image/PhotoUser.png'} />

                            <div className={`dvDesplegable pt-0 w-32 ${isDesplegableVisible ? 'dvDesplegableActivo' : 'dvDesplegableInactivo'}`}>
                                <ul className=' w-full '>
                                    <div className="text-base p-0 m-0 text-[#ffffff] flex justify-between items-center pl-15 border-b border-dashed border-[#ccc] hover:bg-[#e5e5e5] hover:text-[#FF3B26]">
                                        <div className=' m-0 p-1 text-base flex w-full items-center pl-3'>
                                            <a href="#" className='flex w-full items-center'>
                                                <span className='mr-0 w-8  text-2xl pr-2 '><ImUser /></span>
                                                <button onClick={handleClick}>Perfil</button>
                                            </a>
                                        </div>

                                    </div>
                                    <li onClick={CerrarSesion} className='  text-base ml-0  w-full p-1 text-[#ffffff]'>
                                        <a href="#" className='flex w-full items-center'>
                                            <span className='mr-0 w-8  text-2xl pr-2 '><ImExit /></span>
                                            <span className='ml-0 w-full '>Salir</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex items-center justify-center '>
                            <p className='text-sm mr-2 ml-2 cursor-pointer'>{getCookie('cPrimerNom')}</p>
                        </div>
                    </div>
                </nav>
                <div className=' w-70 h-screen right-0 pt-16 ' onClick={() => fnocultarAutomatico()}>
                    <div className='p-5'>
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
};
export default Sidebar;
