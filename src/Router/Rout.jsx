
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import App from '../App';
import React, { Component } from "react";

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

class Rout extends Component {
    componentDidMount() {
        const idUsuario = getCookie('idUsuario');
        if (!idUsuario) {
            // console.log("no logeo");
            //window.location.href = "./";
        }
    }
    render() {
        const idUsuario = getCookie('idUsuario');
        // console.log(idUsuario);
        return (
            <BrowserRouter >
                {!idUsuario ?
                    <Routes>
                        <Route path="/" element={<Login />} />
                    </Routes>
                    :
                    <Routes>
                        <Route path="/App" element={<App />} />
                    </Routes>
                }
            </BrowserRouter >
        )
    }
}

export default Rout;