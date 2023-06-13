import React, { Component } from "react";
// import "./Login.scss"  
import axios from "axios";
import Cookies from "universal-cookie";
import { useCookies } from 'react-cookie';
import fileContent from "../assets/LeerAPI";


//Conexion
const baseUrl = fileContent + "Personal/Login";

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
class Login extends Component {

  state = {
    form: {
      _pcUsuario: '',
      _clave: ''
    }
  }
  handlechange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value

      }
    })

  }
  inicarSesion = async () => {
    console.log(this.state.form);
    await axios.get(baseUrl, {
      params: {
        _pcUsuario: this.state.form._pcUsuario,
        _clave: this.state.form._clave
      }
    })
      .then(response => {
        return response.data;
      })
      .then(response => {
        console.log(response);
        if (response !== undefined) {
          var respuesta = response;
          // Asignar las cookies utilizando document.cookie
          document.cookie = `idAcceso=${respuesta.result.idAcceso}; path=/`;
          document.cookie = `idUsuario=${respuesta.result.idUsuario}; path=/`;
          document.cookie = `idPersonal=${respuesta.result.idPersonal}; path=/`;
          document.cookie = `cUsuario=${respuesta.result.cUsuario}; path=/`;
          document.cookie = `cPrimerNom=${respuesta.result.cPrimerNom}; path=/`;
          document.cookie = `cDocumento=${respuesta.result.cDocumento}; path=/`;
          document.cookie = `cDireccion=${respuesta.result.cDireccion}; path=/`;
          document.cookie = `cApePat=${respuesta.result.cApePat}; path=/`;
          document.cookie = `cApeMat=${respuesta.result.cApeMat}; path=/`;


          //Muestra para mostrar una cookie en especifico
          //   console.log('cPrimerNom: ' + getCookie('cPrimerNom'));
          console.log(document.cookie);
          window.location.href = "./Dashboard";
        } else {
          alert('El usuario o la contraseña no es correcta');
        }
      })
      .catch(error => {
        console.log("Error");
      });
  };

  componentDidMount() {
    const idUsuario = getCookie('idUsuario');
    if (!idUsuario && window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }



  render() {
    return (
     
      <div className=' flex  items-center justify-center w-full min-h-screen m-auto p-2 top-auto left-auto row-auto bg-auto  static  '>
        <div className="w-full lg:w-4/12 sm:w-96 rounded-md overflow-hidden shadow-2xl shadow-[#837f7f] ">
          <div className="bg-[#ffffff] p-5 border-2 border-[#c7c7c785]">
            <div className="relative z-20 p-3">
              <img
                id="divLogo"
                className=" h-20 md:h-28 object-cover mx-auto"
                src="/src/image/LOGO_NEGRO.png"
                alt="Logo"
              />
              <div className='mt-8'>
                <div className='flex flex-col'>
                  <label className='text-lg font-medium  text-[#FF3B26]'>Usuario</label>
                  <input
                    type="text" id="user" name="_pcUsuario"
                    className='w-full border-2 border-[#ff3c264d] rounded-xl p-4 mt-1 text-[#000000] focus:outline-none  focus:border-1 focus:border-[#ec0d0d]'
                    placeholder="Ingrese su Usuario"
                    onChange={this.handlechange} />
                </div>
                <div className='flex flex-col mt-4'>
                  <label className='text-lg font-medium text-[#FF3B26]'>Contraseña</label>
                  <input
                    className='inputText w-full border-2 border-[#ff3c264d] rounded-xl p-4 mt-1 text-[#000000] focus:outline-none focus:border-[#ec0d0d]'
                    placeholder="Ingrese su contraseña"
                    type="password" id="password" name="_clave"
                    onChange={this.handlechange}
                  />
                </div>

                <div className='mt-8 flex flex-col  pb-5 pt-3'>
                  <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-[#FF3B26] rounded-xl text-white font-bold text-lg'
                    onClick={() => this.inicarSesion()}
                  >Sign in</button>

                </div>
                {/* <div className='mt-8 flex justify-center items-center'>
                  <p className='font-medium text-base'>Don't have an account?</p>
                  <button
                    onClick={() => setAuthState('register')}
                    className='ml-2 font-medium text-base text-violet-500'>Sign up</button>
                </div> */}
              </div>
            </div>
          </div>


        </div>
      </div>
    )
  }

};
export default Login;