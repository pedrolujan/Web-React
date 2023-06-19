import React from "react";

const Usuario = (props) => {

  const { location } = props;
  const message = location.state ? location.state.message : '';

  return (
    <div>
      <h1>Componente B</h1>
      <p>Mensaje recibido: {message}</p>
    </div>
  );
};

export default Usuario;