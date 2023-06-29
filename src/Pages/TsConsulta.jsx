
import React, { useState } from 'react';
import { fnBuscarConsultas } from '../Funcions/Fun_Globales';
import { FormatearNombre } from "../Funcions/Fun_Globales";


//Funcion de Formatear Texto  ubicada en el archivo FunGeneral.jsx
const FormatoText = (cadena) => {
    return FormatearNombre(cadena)
};

const fnresetInputValue = () => {
    //La id es del input de Busqueda que se encuentra en la parte inferior
    const input = document.getElementById('textBusquedaConsulta'); //  el ID del input
    if (input) {
        input.value = ''; // Restablece el valor del input a una cadena vacía
    }
};

const AcDConsulta = () => {
    //Estados declarados dentro de  una funcion
    const [listarBusquedaConsulta, setListarBusquedaConsulta] = useState([]);
    const [mostrarTableConsultas, setMostrarTableConsultas] = useState(false)
    const [mostrarRestadosConsulta, setMostrarRestadosConsulta] = useState([]);
    const [mostrarResultTabla, setMostrarResultTabla] = useState(false)
    const fnListarBusquedaConsulta = async (event) => {
        try {
            if (event.key === 'Enter') {
                let BuscarConsulta = document.getElementById('textBusquedaConsulta').value;
                if (BuscarConsulta.includes) {
                    setMostrarResultTabla(false)
                }
                if (BuscarConsulta.length == 0) {
                    BuscarConsulta = "";
                }
                const busq = await fnBuscarConsultas(BuscarConsulta, 0);
                //  console.log(busq.result);
                setListarBusquedaConsulta(busq.result);
                if (busq.result.length > 0) {

                    setMostrarTableConsultas(true)
                } else {

                    setMostrarTableConsultas(false)
                }
            }
        } catch (error) {
            console.log('Error al buscar consultas:', error);
        }
    };

    const fnDetalleConsultas = async (event) => {
        let IdConsulta = event.target.parentNode.getAttribute('attr');
        // console.log(IdConsulta);
        const detalleConsulta = await fnBuscarConsultas(IdConsulta, 1);
        // console.log(detalleConsulta);
        setMostrarRestadosConsulta(detalleConsulta)

        if (detalleConsulta.result.length > 0) {
            setMostrarResultTabla(true)
            fnresetInputValue();
        } else {
            setMostrarResultTabla(false)
        }
        console.log(detalleConsulta);
        setMostrarTableConsultas(false)
    }

    return (
        <div>
            {/* GroupBox Busqueda de Consultas */}
            <div className="  bg-[#fcfcfc] rounded-t-md rounded-b-md pb-2 ">
                <div className=" rounded-t-md bg-[#696969]  ">
                    <div className="p-0.5">
                        <span className="text-white pl-2">
                            Buscar
                        </span>
                    </div>
                </div>
                <div className=" pl-2 pr-2 pt-2 mb-2">
                    <div>
                        <input
                            onClick={fnListarBusquedaConsulta} //Buscar al presionar la Tecla Enter 
                            onKeyDown={fnListarBusquedaConsulta}
                            id="textBusquedaConsulta" //id del input para capturar los valores
                            type="text"
                            placeholder="Por: Placa /Cliente /Imei /Sim Card " //Muestra el contenido que se visualiza en el input
                            className=" text-[#3b3b3b] w-full border-t border-l border-r border-b border-[#5f5f5f63]   focus:outline-none focus:border-[#5f5f5f63] rounded "
                        />
                    </div>
                </div>

                {/* Tabla de resultados de la busqueda */}
                {/* Ocultamos el contenedor y mostramos con la funcion despues de presionar enter en el boton de busca */}
                <div className={`pl-2 pr-2 ${mostrarTableConsultas ? "block" : "hidden"}`}  >
                    <table className="w-full bg-[#ffffff]">
                        <thead className="bg-[#696969]">
                            <tr className="text-[#ffffff]">
                                <th className="font-normal">N°</th>
                                <th className="px-4 font-normal text-left">Detalle</th>
                            </tr>
                        </thead>
                        <tbody key={"id"} >
                            {listarBusquedaConsulta.length > 0 && listarBusquedaConsulta.map((lc) => (
                                <tr className="text-[#3b3b3b] border-solid border-[#b4aeae79] border-b-2 cursor-pointer" key={lc.id} attr={lc.id} onDoubleClick={fnDetalleConsultas}>
                                    <td className="px-4 py-2 text-xs">{lc.id}</td>
                                    <td className="px-4 py-2">{lc.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* GroupBox Para mostrar los Detalles de la busqueda */}
            {/* GroupBox Informacion de cliente */}
            <div className={`${mostrarResultTabla ? "block" : "hidden"}`}>
                <div className={`rounded-t-md mt-5 ` } >
                    <div className=" rounded-t-md bg-[#696969] ">
                        <div className="p-0.5">
                            <span className="text-white pl-2">
                                Cliente
                            </span>
                        </div>
                        <div className=' bg-[#ffff] pb-2 pt-2'>
                            <div className=' items-center grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3 '>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 lg:pb-2'>
                                    <div className=''>
                                        <span className="mb-2 font-medium text-[#3b3939] ">
                                            Nombres:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {/* Se accede a la ubicacion exacta del array para mostrar la informacion deseada
                                            la informacion mostrada esta dentro de un formato de texto para colocar la primera letra en Mayus. */}

                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].cliente.nombres) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Apellido Paterno:
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].cliente.apellidosPaterno) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                <div className=' text-ms'>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Apellido Materno:
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].cliente.apellidosMaterno) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Celular:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].cliente.celular) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Contacto 1:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].cliente.contacto1) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Celular Contacto 1:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].cliente.celularContacto1) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* GroupBox Informacion de Equipo */}
                <div className='  rounded-t-md mt-5'>
                    <div className=" rounded-t-md bg-[#696969] ">
                    <div className="p-0.5">
                            <span className="text-white pl-2">
                                Equipo
                            </span>
                        </div>
                         <div className=' bg-[#ffff] pb-2 pt-2'>
                            <div className=' items-center grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3 '>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Codigo Documento de Compra:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].equipo.codDocCompra) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 lg:pb-2'>
                                    <div className=''>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Nombre:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].equipo.nombre) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Serie:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].equipo.serie) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Marca:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].equipo.marcaEquipo.nombre) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Modelo:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].equipo.modeloEquipo.nombre) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Imei:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].equipo.imei) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* GroupBox Informacion de Plan */}
                <div className='  rounded-t-md mt-5'>
                    <div className=" rounded-t-md bg-[#696969] ">
                    <div className="p-0.5">
                            <span className="text-white pl-2">
                                Plan
                            </span>
                        </div>
                         <div className=' bg-[#ffff] pb-2 pt-2'>
                            <div className=' items-center grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3 '>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Nombre de Plan:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].plan.name) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Ciclo:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].plan.ciclo.nombre) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Tipo Contrato:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].plan.tipoContrato
                                            ) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 lg:pb-2'>
                                    <div className=''>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Tipo Plan:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].plan.tipoPlan.nombre) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Tipo Tarifa:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].plan.tipoTarifa.nombre) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* GroupBox Informacion Vehiculo */}
                <div className='  rounded-t-md mt-5'>
                    <div className=" rounded-t-md bg-[#696969] ">
                    <div className="p-0.5">
                            <span className="text-white pl-2">
                                Vehículo
                            </span>
                        </div>
                         <div className=' bg-[#ffff] pb-2 pt-2'>
                            <div className=' items-center grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3 '>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Clase de Vechiculo:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].vehiculo.claseVehiculo.nombre) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Color:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].vehiculo.color) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Placa:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].vehiculo.placa
                                            ) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 lg:pb-2'>
                                    <div className=''>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Serie:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].vehiculo.serie) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Año:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].vehiculo.anio) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Marca:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].vehiculo.marcaVehiculo.nombre) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Modelo:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].vehiculo.modeloVehiculo.nombre) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Modo de Uso:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].vehiculo.modoUso.nombre) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* GroupBox Informacion Sim Card */}
                <div className='  rounded-t-md mt-5'>
                    <div className=" rounded-t-md bg-[#696969] ">
                    <div className="p-0.5">
                            <span className="text-white pl-2">
                                SimCard
                            </span>
                        </div>
                         <div className=' bg-[#ffff] pb-2 pt-2'>
                            <div className=' items-center grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3 '>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Número SimCard:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].simCard.cSimCard) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Numero de Recibo:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? (mostrarRestadosConsulta.result[0].simCard.nunRecibo) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                                <div className='pl-3 pr-4 grid grid-cols-2 md:grid-cols-1 '>
                                    <div>
                                         <span className="mb-2 font-medium text-[#3b3939] ">
                                            Operador:
                                        </span>
                                    </div>
                                    <div className=' text-ms'>
                                        <span>
                                            {mostrarRestadosConsulta.state == true ? FormatoText(mostrarRestadosConsulta.result[0].simCard.operador.name
                                            ) : "Datos no Encontrados"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default AcDConsulta;