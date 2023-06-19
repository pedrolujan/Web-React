


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

    const [activo, setActivo] = useState("01");

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
            id: "01",
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />,
            subRouter: [{
                path: "/clientes",
                name: "Clientes",
                icon: <FaUserAlt />
            }  ,{
                
                path: "/clientes",
                name: "Clientes",
                icon: <FaUserAlt />
            }  
             
                      
            ]
        },
        {
            id: "02",
            path: "/clientes",
            name: "Clientes",
            icon: <FaUserAlt />
        },
        {
            id: "03",
            path: "/usuario",
            name: "Usuario",
            icon: <ImUser />
        },
        {
            id: "04",
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

                // console.log(data);
                const dataArray = Array.isArray(data.result) ? data.result : [data.result];
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
                // console.log(dataUser);


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
        <div className='bg-[#e5e5e5c7]  min-h-screen' onClick={ocultarAutomatico}>

            <div className={` bg-[#2d3035] z-50 fixed lg:left-0 top-0 w-52 h-full flex flex-col  justify-between py-1 
                    transition-all ${showMenu ? "lef-0" : "-left-full"} `} id='Sidebar' >
                <div className=' '>
                    <div className='text-2xl text-gray-300 uppercase font-bold text-center my-0   ' >
                        <img className='border-t-1 m-b-2 px-6 py-3' src='../src/image/LOGO.png' />
                    </div>
                    {/* <hr className='mt-0.5' /> */}

                    <div className='pl-0 w-auto  '>
                        {menuItem
                            .filter((item) => item.id !== "03")
                            .map((item) => (
                                <NavLink to={item.path} key={item.id} className={`dvLetrasMenu  text-[#ffffff]  flex w-auto ${item.id === activo ? 'activo' : ''}`} onClick={() => handleActive(item.id)}>
                                    <div className={`dvItemMenu pr-4 flex items-center group hover:bg-[#ffffff] p-1 w-full group transition-colors`}>
                                        <div className="icon flex  m-0 w-auto group-hover:text-[#FF3B26] transition-colors">
                                            <span className='p-4 text-xl'>
                                                {item.icon}
                                            </span>
                                        </div>
                                        <div className="w-full p-1  group-hover:text-[#FF3B26] transition-colors">
                                            <span>
                                                {item.name}
                                            </span>
                                        </div>
                                    </div>
                                </NavLink>
                            ))}

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

            <div className=' lg:pl-52  w-full  ' >
                <nav className="dvHeader bg-[#ffffff]  text-[#3b3b3b] fixed text-3xl py-2 px-0   lg:rounded-br-none flex items-center justify-between  w-full top-0 left-0 h-16">
                    <div className=' px-5'>
                        <button onClick={toggleMenu} className="  p-1 ml-2 text-4xl">{showMenu ? <BsList /> : <BsList />}</button>
                    </div>

                    <div className='cursor-pointer flex rounded-l-full border-[#505050]' onClick={handleImagenUserClick}>
                        <div className='items-center'>
                            <img className='object-cover  cursor-pointer border-2 border-[#FF3B26] w-14 h-14 rounded-full border-solid' src={profileImage || '../src/image/PhotoUser.png'} />
                            <div className={`dvDesplegable w-32 ${isDesplegableVisible ? 'dvDesplegableActivo' : 'dvDesplegableInactivo'}`}>
                                <ul className=' w-full '>
                                    <li className='text-base p-1 text-[#ffffff] '>
                                        {menuItem.filter((item) => item.name == "Usuario")
                                            .map((item) => (
                                                <NavLink to={{ pathname: "./Usuario", state: { message: 'Hola Mundo' } }} key={item.name} className={` flex w-full m-0 `} >
                                                    <span className=' text-2xl pr-2 '>
                                                        {item.icon}
                                                    </span>

                                                    <span className="dvLetraIcono ">
                                                        <span>
                                                            {item.name}
                                                        </span>
                                                    </span>

                                                </NavLink>
                                            ))}


                                    </li>
                                    <li onClick={CerrarSesion} className='text-base ml-0  w-full p-1 text-[#ffffff]'>
                                        <a href="#" className='flex w-full items-center'>
                                            <span className='mr-0 w-8  text-2xl pr-2 '><ImExit /></span>
                                            <span className='ml-0 w-full '>Salir</span>
                                        </a>
                                    </li>
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