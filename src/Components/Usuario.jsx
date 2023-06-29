import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FormatearNombre } from "../Funcions/Fun_Globales";

//Funcion de Formatear Nombre 
const FormatoText = (cadena) => {
  return FormatearNombre(cadena)

};

const Usuario = () => {
  const location = useLocation();
  const datos = location.state;
  const [profileImage, setProfileImage] = useState(null);
  const [datosUsuario, setDatosUsuario] = useState(datos);

  useEffect(() => {
    let ImagenUsuario = datosUsuario[0].btImgPerfil;

    if (ImagenUsuario) {
      const cleanBase64 = ImagenUsuario.replace(/[^A-Za-z0-9+/=]/g, '');
      const decodedData = atob(cleanBase64);
      const byteArray = new Uint8Array(decodedData.length);

      for (let i = 0; i < decodedData.length; i++) {
        byteArray[i] = decodedData.charCodeAt(i);
      }

      const imageBlob = new Blob([byteArray], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(imageBlob);

      setProfileImage(imageUrl);
    }
  }, []);

  // console.log(datos);
  return (
    // DivGeneral [InfoUsuario-FotoPerfil]
    <div className='  grid grid-cols-1 md:grid-cols-2  p-2'>
      {/* DivInformacionUser que contiene la informacion del usuario */}
      <div className=' lg:pl-48 flex justify-center '>
        {datosUsuario.map((dp) => (
          <div key={dp.idUsuario}>
            <div className=' '>

              {/* Contenedor de Nombre */}
              <div className=" pb-2 flex flex-col w-80">
                <span className="text-[#F97217] pr-2 font-medium">
                  Primer Nombre:
                </span>
                <input
                  className="border border-gray-300 rounded-md px-4 focus:border-[#e71212] focus:outline-none"
                  type="text"
                  defaultValue={FormatoText(dp.cPrimerNom)}
                  readOnly
                />
              </div>

              {/* Contenedor de Segundo Nombre */}
              <div className=" pb-2 flex flex-col w-80">
                <span className="text-[#F97217] pr-2 font-medium">
                  Segundo Nombre:
                </span>
                <input
                  type="text"
                  defaultValue={FormatoText(dp.cUsuario)} //Reemplazar por segundo nombre (Ahora no se encuentra disponible)
                  readOnly
                  className="border border-gray-300 rounded-md  px-4 focus:border-[#e71212] focus:outline-none"
                />
              </div>

              {/* Contenedor de Apellido Paterno */}
              <div className="pb-2  flex flex-col  w-80">
                <span className="text-[#F97217] pr-2 font-medium">
                  Apellido Paterno:
                </span>
                <input
                  className="border border-gray-300 rounded-md px-4 focus:border-[#e71212] focus:outline-none"
                  type="text"
                  defaultValue={FormatoText(dp.cApePat)}
                  readOnly
                />
              </div>

              {/* Contenedor de Apellido Materno */}
              <div className=" pb-2  flex flex-col w-80 ">
                <span className="text-[#F97217] pr-2 font-medium">
                  Apellido Materno:
                </span>
                <input
                  className="border border-gray-300 rounded-md px-4 focus:border-[#e71212] focus:outline-none"
                  type="text"
                  defaultValue={FormatoText(dp.cApeMat)}
                  readOnly
                />
              </div>

              {/* Contenedor de Direccion */}
              <div className='pb-2  flex flex-col w-80 '>
                <span className='text-[#F97217] pr-2 font-medium'>
                  Direccion:
                </span>
                <input
                  className="border border-gray-300 rounded-md px-4 focus:border-[#e71212] focus:outline-none"
                  type="text"
                  defaultValue={FormatoText(dp.cDireccion)}
                  readOnly
                />
              </div>

              {/* Contenedor de Documento */}
              <div className='pb-2   flex flex-col w-80 '>
                <span className='text-[#F97217] pr-2  font-medium'>
                  Documento:
                </span>
                <input
                  className="border border-gray-300  rounded-md px-4 focus:border-[#e71212] focus:outline-none"
                  type="text"
                  defaultValue={dp.cDocumento}
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DivContenedor de la foto del usuario */}
      <div className=' flex  justify-center lg:justify-start lg:pt-0 pt-5 items-center'>
        <div className=" ">
          <div className="relative">
            <img
              className="h-40 cursor-pointer border-2 border-[#FF3B26] rounded-full border-solid hover:filter hover:brightness-50"
              src={profileImage || "../src/image/PhotoUser.png"}
              alt="Foto de perfil"
            />
            {/* Contenedor del Focus tramsparente en la foto del perfil */}
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center rounded-full border-solid  justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50">
              <span className="text-white text-center p-2">
                Cambiar imagen
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Usuario;
