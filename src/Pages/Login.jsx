import React, { Component } from "react";
import "./Login.scss"
import axios from "axios";
import Cookies from "universal-cookie";
import { useCookies } from 'react-cookie';

const baseUrl = "https://442d-2800-4b0-8010-2d1a-e1b9-7d15-f9d3-b6fe.ngrok.io/Personal/Login";

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
            window.location.href="./Dashboard";
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
            <div className="page">

                <div className="cover">

                    <img id="divLogo" src="/src/image/LOGO_NEGRO.png" />
                    <input type="text" id="user" name="_pcUsuario" onChange={this.handlechange} />
                    <input type="password" id="password" name="_clave" onChange={this.handlechange} />

                    <div className="login-btn" onClick={() => this.inicarSesion()}>
                        Login

                    </div>

                    <div>
                        <h3 id="Mensaje"></h3>
                        <p id="DatosPersonales"></p>

                    </div>
                </div>

            </div>
        )
    }

};
export default Login;