import React, { useState } from 'react';
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
const Usuario = () => {
  // Obtener los valores de las cookies
  const nombre = getCookie('cUsuario');
  const apellido = getCookie('cApeMat');

  return (
    <div>
      <h2>Usuario: {nombre}</h2>
      <p>Email: {apellido}</p>
    </div>
  );
};

export default Usuario;



const[persona,setPersona]= useState([])

{persona.data((pd)=>{
  
})

}