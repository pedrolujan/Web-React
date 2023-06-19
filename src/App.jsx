
// import React from 'react';
import React, { Component } from "react";


import SidebarMenu from './Pages/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Clientes from './Pages/Clientes'
import Productos from './Pages/Productos'
import Login from './Pages/Login';
import Sidebar from "./Pages/Sidebar";
import Usuario from "./Pages/Usuario";

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


class App extends Component {

  componentDidMount() {
    const idUsuario = getCookie('idUsuario');
    if (!idUsuario && window.location.pathname !== "/") {
      window.location.href = "/";
    }
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
      const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId)

      // Validate that all variables exist
      if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener('click', () => {
          // show navbar
          nav.classList.toggle('show')
          // change icon
          toggle.classList.toggle('bx-x')
          // add padding to body
          bodypd.classList.toggle('body-pd')
          // add padding to header
          headerpd.classList.toggle('body-pd')
        })
      }
      showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

      /*===== LINK ACTIVE =====*/
      const linkColor = document.querySelectorAll('.nav_link')

      function colorLink() {
        if (linkColor) {
          linkColor.forEach(l => l.classList.remove('active'))
          this.classList.add('active')
        }
      }
      linkColor.forEach(l => l.addEventListener('click', colorLink))
    }

  }
  render() {
    const idUsuario = getCookie('idUsuario');
    return (
      <BrowserRouter>
        {!idUsuario ?
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
          :
          <Sidebar>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/usuario" element={<Usuario />} />
              <Route path="/productos" element={<Productos />} />
            </Routes>
          </Sidebar>

        }
      </BrowserRouter>
    )
  }
}
export default App