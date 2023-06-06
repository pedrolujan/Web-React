import React from 'react';

const Clientes = () => {
  const data = [
    { id: 1, nombre: 'Cliente 1', telefono: '123456789' },
    { id: 2, nombre: 'Cliente 2', telefono: '987654321' },
    { id: 3, nombre: 'Cliente 3', telefono: '555555555' },
  ];

  return (
    <div>
      <h2>Clientes</h2>
      <table className="clientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Clientes;

