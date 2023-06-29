import React, { Component } from "react";
import fileContent from "../assets/LeerAPI";
import { componentDidMountLlenarComboboxTipoReporte, componentDidMountLlenarComboboxUsuario, componentDidMountLlenarComboboxFiltroIngresos, componentDidMountBuscarIngresos, fnImporteCaja } from "../Funcions/Fun_Globales"

import "./Dashboard.scss";
import { startOfMonth } from 'date-fns';
import { BsPrinter, BsSearch } from "react-icons/bs";
import { FaWhatsapp, FaMoneyBillAlt, FaCheck, FaRegTimesCircle } from "react-icons/fa";
import { RiSignalTowerLine, RiTimerLine } from "react-icons/ri";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { TfiBell, TfiAlert } from "react-icons/tfi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GiPiggyBank } from "react-icons/gi";
import { GoChevronRight } from "react-icons/go";

//fecha Actual
const today = new Date();

//FechaInicial 
const startOfMonthDate = startOfMonth(today);

//Variable para mapear el resultado del usuario
let resultUser = [];

//Buscar
const BuscarIngresosInicial = await componentDidMountBuscarIngresos(true, false, startOfMonthDate, today, "TRPT0001", "0", "0", "0", "0", "0", "0", "%22%20%22", "0", "-1", "0");
// console.log(BuscarUsuario[1]);


//LlenarImporteCaja
const ImporteCaja = await fnImporteCaja(today, 0)
//  console.log(ImporteCaja);


//Llenar Combobox FiltroIngresos
const cboFiltroIngresos = await componentDidMountLlenarComboboxFiltroIngresos("cboFiltrarIngresos", "idOperacion", "cNombreOperacion", "OperacionHusat", "cTipoOpe", 4, true);


//Llenar Combobox TipoReporte
const cboTipoReport = await componentDidMountLlenarComboboxTipoReporte("TRPT", false);

//crear funcion para imagen ContenedorSupeior
const IconSupeior = (codigoB) => {

    let Icon = null; // Cambiamos la declaración a 'let'
    if (codigoB === "TEGR0002") {
        Icon = <BsPrinter />;
    } else if (codigoB === "TEGR0003") {
        Icon = <HiOutlineLockClosed />;
    }
    return Icon;
}

//Crear una funcion

//Funcion para Cambiar el incono con respecto al codigo 
const fnIconCodigoInferior = (codigo) => {
    let heartIcon = null; // Cambiamos la declaración a 'let'
    if (codigo === "00000005") {
        heartIcon = <FaWhatsapp />;
    } else if (codigo === "00000004") {
        heartIcon = <RiTimerLine />;
    } else if (codigo === "00000002") {
        heartIcon = <RiSignalTowerLine />;
    } else if (codigo === "00000003") {
        heartIcon = < TfiAlert />;
    } else if (codigo === "00000001") {
        heartIcon = < TfiBell />;
    }
    return heartIcon;
}


//Funcion Formatear Precio
const fnFormatearPrecio = (importe) => {

    const formattedPrice = importe.toLocaleString("es-PE", {
        style: "currency",
        currency: "PEN",
    });

    return formattedPrice
}

// console.log("Dia final" + today);
// console.log("Dia Uno" + startOfMonthDate);
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

const cboUserInicial = await componentDidMountLlenarComboboxUsuario(true, startOfMonthDate, today, true, 0);
class Dashboard2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportes: [],
            opcionesComboBox: [],
            isChecked: true,
            ischeckedDia: true,
            resultUser: [],
            reportBusqueda: [],
            reportBusquedaDetallada: [],
            MostrarBusquedaDetalle: false,
            MostrarMasDetalleBusquedas: false,
            reportMasDetalleBusqueda: [],
            stimporteCaja: false

        };
    }

    fnhandleChangeDia = () => {
        this.setState(prevStateDia => ({
            ischeckedDia: !prevStateDia.ischeckedDia

        }))
        if (this.state.ischeckedDia === true) {
            document.getElementById('fechaInicio').value = today.toISOString().split('T')[0];
        } else {
            document.getElementById('fechaInicio').value = startOfMonthDate.toISOString().split('T')[0];
        }

    };

    fnImporteCaja = () => {
        this.setState(prevState => ({
            stimporteCaja: !prevState.stimporteCaja
        }));
        // console.log("Hola");
    }

    //Ocultar Mas BusquedaDetalle
    fnOcultarMasBusquedaDetalle = () => {
        this.setState(OcultarBD => ({
            MostrarMasDetalleBusquedas: false
        }));
    }

    //CheckBox
    fnhandleChange = () => {
        this.setState(prevState => ({
            isChecked: !prevState.isChecked
        }));
    };

    //handleBusqueda
    fnhandleBusqueda = async () => {

        let dtFechaInicio = document.getElementById('fechaInicio').value;
        let dtFechaFinal = document.getElementById('fechaFinal').value;
        let cboTipoReporte = document.getElementById('cboCheckedTipoReport').value;
        let cboFiltroI = document.getElementById('cboFiltroIngresos').value;
        let cboUsuarios = document.getElementById('cboUsuario').value;
        let BuscarIngresos = document.getElementById('txtBuscarIngresos').value;
        if (BuscarIngresos.length === 0) {
            BuscarIngresos = "%"
        }
        let chekeckFecha = this.state.isChecked;
        let checkeckDiaEspecifico = document.getElementById('ChecketDiaEspecifico').checked;

        this.setState({
            reportBusqueda: await componentDidMountBuscarIngresos(chekeckFecha, checkeckDiaEspecifico, dtFechaInicio, dtFechaFinal, cboTipoReporte, cboFiltroI, cboUsuarios, cboFiltroI, "0", "0", "0", BuscarIngresos, 0, -1, 0)

        });
        this.setState({
            MostrarBusquedaDetalle: false
        })
        this.setState({
            MostrarMasDetalleBusquedas: false
        })
    }

    //Funcion Mostrar BusquedaDetalle
    fnhandleBusquedaDetalles = async (event) => {
        let codigoReporte = event.target.parentNode.getAttribute('attr');
        document.cookie = `IdSegundaTabla=${codigoReporte}; path=/`;
        let dtFechaInicio = document.getElementById('fechaInicio').value;
        let dtFechaFinal = document.getElementById('fechaFinal').value;
        let cboTipoReporte = document.getElementById('cboCheckedTipoReport').value;
        let cboFiltroI = document.getElementById('cboFiltroIngresos').value;
        let cboUsuarios = document.getElementById('cboUsuario').value;
        let BuscarIngresos = document.getElementById('txtBuscarIngresos').value;
        if (BuscarIngresos.length === 0) {
            BuscarIngresos = "%"
        }
        let chekeckFecha = this.state.isChecked;
        let checkeckDiaEspecifico = document.getElementById('ChecketDiaEspecifico').checked;

        this.setState({
            reportBusquedaDetallada: await componentDidMountBuscarIngresos(chekeckFecha, checkeckDiaEspecifico, dtFechaInicio, dtFechaFinal, cboTipoReporte, codigoReporte, cboUsuarios, cboFiltroI, "0", "0", "0", BuscarIngresos, 0, -2, 0)

        });
        this.setState({
            MostrarBusquedaDetalle: true
        })
        // console.log(codigoReporte);

    }

    //Funcion Mostrar Más busquedaDetalle
    fnhandleMasBusquedaDetalles = async (event) => {
        let codigoReporte = event.target.parentNode.getAttribute('attr');
        let idSegundaTabla = getCookie('IdSegundaTabla');
        let dtFechaInicio = document.getElementById('fechaInicio').value;
        let dtFechaFinal = document.getElementById('fechaFinal').value;
        let cboTipoReporte = document.getElementById('cboCheckedTipoReport').value;
        let cboFiltroI = document.getElementById('cboFiltroIngresos').value;
        let cboUsuarios = document.getElementById('cboUsuario').value;
        let BuscarIngresos = document.getElementById('txtBuscarIngresos').value;
        if (BuscarIngresos.length === 0) {
            BuscarIngresos = "%"
        }
        let chekeckFecha = this.state.isChecked;
        let checkeckDiaEspecifico = document.getElementById('ChecketDiaEspecifico').checked;

        this.setState({
            reportMasDetalleBusqueda: await componentDidMountBuscarIngresos(chekeckFecha, checkeckDiaEspecifico, dtFechaInicio, dtFechaFinal, cboTipoReporte, idSegundaTabla, cboUsuarios, codigoReporte, "0", "0", "0", BuscarIngresos, 0, -3, 0)


        });
        this.setState({
            MostrarMasDetalleBusquedas: true
        })
        // console.log(this.state.reportMasDetalleBusqueda);
    }


    //dateTime Inicio
    fnhandleDateChange = async (event) => {

        //Mostrar fechaInicio-FechaFinal
        const dtFechaInicio = document.getElementById('fechaInicio')
        const dtFechaInicioValor = dtFechaInicio.value;
        const dtFechaFinal = document.getElementById('fechaFinal');
        const dtFechaFinalValor = dtFechaFinal.value;

        let chekeckFecha = this.state.isChecked;


        this.setState({
            resultUser: await componentDidMountLlenarComboboxUsuario(chekeckFecha, dtFechaInicioValor, dtFechaFinalValor, true, 0),
        });

    };


    // Llamada a componentDidMountObtenerContenedores en el lugar correspondiente
    async componentDidMount() {

        await this.componentDidMountObtenerContenedores();

    }

    async componentDidMountObtenerContenedores() {
        try {
            const params = {
                _tipoCon: "-1",
            };

            const baseurl = new URL(
                fileContent + "Dashboard/ListarContenedores"
            );
            baseurl.searchParams.append("_tipoCon", params._tipoCon);

            const response = await fetch(baseurl);
            const data = await response.json();
            // const codigosReporte = data.result.map((reporte) => reporte.codigoreporte);

            this.setState({
                reportes: data.result,
            });

        } catch (error) {
            console.error("Error al obtener los datos de la API:", error);
        }
    }

    render() {
        const { reportes } = this.state;
        const { isChecked } = this.state;
        const { resultUser } = this.state;
        const { reportBusqueda } = this.state;
        const { reportBusquedaDetallada } = this.state;
        const { MostrarBusquedaDetalle } = this.state;
        const { ischeckedDia } = this.state;
        const { MostrarMasDetalleBusquedas } = this.state;
        const { reportMasDetalleBusqueda } = this.state;
        const { stimporteCaja } = this.state

        // console.log(reportBusqueda[0]);

        // console.log("Tamaño " + reportes.length);
        // this.componentDidMountObtenerContenedores();
        return (

            <div className="  p-0">
                {/* Importe De Caja */}
                <div className={`rounded-l-md m-2 bg-[#FF3B26]  absolute right-0 md:right-2 top-36 cursor-pointer    ${stimporteCaja ? "w-14" : "w-48"}`}  >

                    <div className="flex items-center">
                        <span
                            className={`pr-2 p-1 flex items-center rounded-l-md bg-[#FF3B26] text-4xl text-[#f7eeed] ${stimporteCaja ? "ocultar-posicion" : ""}`}
                            onClick={this.fnImporteCaja}
                        >
                            {stimporteCaja ? <GiPiggyBank /> : < GoChevronRight />}
                        </span>

                        <div className={`pl-1 w-full bg-[#ffffff] border-t-2 border-b-2 border-[#FF3B26] font-bold  justify-center ${stimporteCaja ? "hidden" : "block"}`} >
                            <div className="text-[#FF3B26]  w-full  text-sm text-center">
                                <span className="">
                                    Importe en caja
                                </span>
                            </div>

                            <div className="text-[#FF3B26]  w-full  text-sm text-center">
                                <span className=" ">

                                    {ImporteCaja.state == true ? fnFormatearPrecio(ImporteCaja.result[0].importe) : fnFormatearPrecio("00.00")}
                                </span>
                            </div>


                        </div>
                    </div>
                </div>

                {/* Contenedores Superiores| Caja chica-Copias */}
                <div className="dvContenedorInferior  w-full ">
                    <div key="contenedor" className="  items-center  mb-5 p-1 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-1 rounded-md  justify-center ">
                        <div className="w-56 ">
                        </div>
                        {
                            BuscarIngresosInicial[1].map((reportBusqueda) => (
                                <div key={reportBusqueda.codigoreporte} className={` items-baseline justify-around   md:w-56 mb-3  rounded-xl ${reportBusqueda.codigoreporte == "TEGR0002" ? "bg-[#696969]" : reportBusqueda.codigoreporte == "TEGR0003" ? "bg-[#2A6D75]" : "bg-[#a32c0f]"} `}>

                                    <div>
                                        <p className="ciPanelSupeior  text-sm flex justify-around text-white"> Tipo Concepto</p>
                                    </div>


                                    <div className="ciPanelCentral flex items-center justify-around p-3">
                                        <div className="pcCantidad  text-xl p-2">

                                            <h1 className="text-white">{reportBusqueda.detallereporte}</h1>
                                        </div>
                                        <div className="pcImg ">
                                            <h1 className=" text-4xl text-white">{IconSupeior(reportBusqueda.codigoreporte)}</h1>
                                        </div>
                                    </div>


                                    <div className="bg-[#0202027e]  p-1 rounded-bl-xl rounded-br-xl ">
                                        <p className="ciPanelSupeior text-sm flex justify-around text-white "> {fnFormatearPrecio(reportBusqueda.importeRow)}</p>
                                    </div>
                                </div>
                            ))
                        }
                        <div className=" w-56 ">
                            <h1>

                            </h1>
                        </div>

                    </div>
                </div>
                <div className="flex w-full  justify-center  ">
                    <hr className=" border-1 border-[#afaeae65] mb-5 w-full" />
                </div>

                {/* Contenedores inferiores| Seguimiento-renovaciones-stock-pagos pendientes */}
                <div className="dvContenedorInferior  items-center  mb-5 p-1 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-1 rounded-md  justify-center">{
                    reportes.map((reporte) => (
                        <div className={`  md:w-56 mb-3 dvContenedoresInferiores  ${reporte.codigoreporte == "00000005" ? "bg-[#861B2D]" : reporte.codigoreporte == "00000004" ? "bg-[#AD7311]" : reporte.codigoreporte == "00000001" ? "bg-[#04837c]" : reporte.codigoreporte == "00000002" ? "bg-[#007E3F]" : "bg-[#a32c0f]"}  p-0 rounded-bl-lg rounded-xl`} key={reporte.codigoreporte} >
                            <div className=" flex w-full justify-center p-1 ">
                                <p className="ciPanelSupeior  text-sm flex justify-around  text-white">{reporte.detallereporte}</p>
                            </div>
                            <div className="ciPanelCentral flex items-center justify-around m-2">
                                <div className="pcCantidad text-4xl text-white">{reporte.cantidad}
                                </div>
                                <div className="pcImg  ">
                                    <h1 className=" text-4xl text-white">{fnIconCodigoInferior(reporte.codigoreporte)}</h1>
                                </div>
                            </div>
                            <div className=" bg-[#13131377] flex  items-center justify-center rounded-bl-lg  rounded-br-xl ">
                                <p className="ciPanelDetalle  m-1 text-white text-sm ">{reporte.masDetallereporte}</p>
                            </div>
                        </div>
                    ))
                }
                </div>

                {/* GroupBox Busqueda */}
                <div className="dvDetalleGeneral  w-full mt-4 grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-1 gap-1 rounded-md">
                    <div className="pb-3" >
                        <div className=" bg-[#ffffff] placeholder:items-baseline justify-around  w-full  rounded-xl  grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-1 gap-1 border-2 border-[#7a767649] border-l border-r border-b">
                            <div className=" bg-[#696969] b rounded-t-xl w-full p-1">
                                <div className="grid  lg:grid-cols-5 md:grid-cols-3 gap-3 " >
                                    <div className="  mr-4 text-white pl-2">
                                        <span> Buscar por</span>
                                    </div>

                                    <div className="  w-full mr-3">
                                        <label className="flex items-center">
                                            <input

                                                type="checkbox"
                                                className="checked form-checkbox h-5 w-5 custom-checkbox"
                                                checked={isChecked}
                                                onChange={this.fnhandleChange}
                                            />

                                            <span className="ml-2 text-white " >Habilitar Fechas</span>
                                        </label>
                                    </div>
                                    <div className=" w-full mr-3">
                                        <label className="flex items-center">
                                            <input
                                                id="ChecketDiaEspecifico"
                                                type="checkbox"
                                                className="checked form-checkbox h-5 w-5 custom-checkbox"
                                                onChange={this.fnhandleChangeDia}
                                            />

                                            <span className="ml-2 text-white ">Dia Especifico</span>

                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="  w-full pt-2 pb-2  p-2 ">
                                <div className=" grid  w-full lg:grid-cols-2">
                                    <div className="  marker:dvFechas grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2   lg:grid-cols-2 gap-2 mb-2 ">
                                        <div className=" dvFechaIncial w-full ml-1 mr-2  ">
                                            <h1 className=" text-[#3b3b3b] mr-2 ">
                                                Fecha Inicial
                                                <input
                                                    type="date"
                                                    id="fechaInicio"
                                                    name="fecha"
                                                    className="flex focus:outline-none  w-full mr-2 text-[#3b3b3b] border border-[#5f5f5f63] p-1 rounded-md"
                                                    defaultValue={startOfMonthDate.toISOString().split('T')[0]}
                                                    onChange={this.fnhandleDateChange}
                                                />
                                            </h1>
                                        </div>
                                        <div className={`dvFechaIncial w-full ml-1 mr-2 ${ischeckedDia ? "block" : "hidden"}`}>
                                            <h1 className=" text-[#3b3b3b] mr-2 ">
                                                Fecha Final
                                                <input
                                                    type="date"
                                                    id="fechaFinal"
                                                    name="fecha"
                                                    className="flex focus:outline-none  w-full mr-2 text-[#3b3b3b] border border-[#5f5f5f63] p-1 rounded-md"
                                                    defaultValue={today.toISOString().split('T')[0]}
                                                    //se ejecuta cuando hay cualquier cambio (onChenge)
                                                    onChange={this.fnhandleDateChange}
                                                />
                                            </h1>
                                        </div>
                                    </div>

                                    <div className=" dvReport-User grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-2   gap-2 mb-2 ">
                                        <div className="dvTipoReporte w-full ml-1 mr-2">
                                            <h1 className="mr-2 text-[#3b3b3b]">Tipo reporte</h1>
                                            <select
                                                id="cboCheckedTipoReport"
                                                style={{ fontSize: '12px' }}
                                                className=" focus:outline-none flex w-full p-2 mr-2 text-[#3b3b3b] border rounded-md border-[#5f5f5f63]">
                                                {cboTipoReport.map((opcion) => (
                                                    <option key={opcion.cCodTab} value={opcion.cCodTab}>
                                                        {opcion.cNomTab}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="dvUsuario w-full ">
                                            <h1 className=" text-[#3b3b3b]  ml-1 mr-1   ">
                                                Usuario
                                                <select id="cboUsuario" style={{ fontSize: '12px' }} className="focus:outline-none flex w-full p-2 mr-2 text-black border rounded-md border-[#5f5f5f63]">
                                                    {

                                                        resultUser.length > 0 ? resultUser.map((opcion) => (
                                                            //key=lo que identifica
                                                            <option key={opcion.idUsuario} value={opcion.idUsuario}>
                                                                {opcion.cUser}
                                                            </option>
                                                        ))
                                                            :
                                                            cboUserInicial.map((opcion) => (
                                                                //key=lo que identifica
                                                                <option key={opcion.idUsuario} value={opcion.idUsuario}>
                                                                    {opcion.cUser}
                                                                </option>
                                                            ))
                                                    }
                                                </select>
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="dvBuscar placeholder:bg-[#1bbba0]">
                                        <div className=" w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1  gap-3 mb-2 lg:grid-cols-1">
                                            <h1 className=" text-[#3b3b3b] ml-1 mr-1    ">
                                                Buscar
                                                <div className=" flex items-center">
                                                    <input id="txtBuscarIngresos" type="search" placeholder="" onKeyDown={this.fnhandleBusqueda} className=" text-[#3b3b3b] w-full border-t border-l border-b border-[#5f5f5f63] p-0.5 run  focus:outline-none focus:border-[#5f5f5f63] rounded-l " />
                                                    <button className="bg-[#ffffff] text-[#3b3b3b] p-1 text-xl rounded-r border-r border-t border-b border-[#5f5f5f63]" onClick={this.fnhandleBusqueda}><BsSearch /></button>
                                                </div>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="dvCuerpoDG  flex m-2">
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GroupBox Filtrar-Ingresos */}
                    <div className=" bg-[#ffffff]  p-1 w-full grid grid-cols-1  rounded-md  border-2 border-[#7a767649] ">
                        <div className=" w-full  flex items-center justify-center gird grid-cols-2   ">
                            <div className="text-[#272527] flex w-full  ">
                                <div className="text-[#3b3b3b] p-2  flex items-center">
                                    <span>
                                        •
                                    </span>
                                    <span className="flex mr-4 lg:mr-8">
                                        Ingresos
                                    </span>
                                </div>
                                <div className="flex w-full p-2 items-center  ">
                                    <h1 className="text-[#3b3b3b] md:pr-5 md:pl-9 lg:pl-28  lg:pr-2 pe-1 ">Filtrar</h1>
                                    <select id="cboFiltroIngresos" style={{ fontSize: '12px' }} className="flex w-full md:w-60 p-2 mr-2 text-[#3b3b3b] focus:outline-none  border border-[#5f5f5f63]  rounded-md">

                                        {cboFiltroIngresos.map((opcionFiltro) => (
                                            //key=lo que identifica
                                            <option key={opcionFiltro.cCodTab} value={opcionFiltro.cCodTab}>
                                                {opcionFiltro.cNomTab}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 1° Tabla de Ingresos */}
                    <div className="dvTablas grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-2 gap-1 rounded-md justify-between ">
                        <div className="bg-[#ffffff] w-full  cursor-pointer">
                            <div className="w-full">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-[#696969]">
                                            <tr className="text-white ">
                                                <th className="font-normal ">N°</th>
                                                <th className="px-4 font-normal text-left"> Detalle</th>
                                                <th className="px-4  font-normal py-2">Cantidad</th>
                                                <th className=" font-normal px-4 text-right">Importe</th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {
                                                reportBusqueda.length > 0 ? (
                                                    <>
                                                        {reportBusqueda[0].map((datos, index) => (

                                                            <tr key={datos.codigoreporte} attr={datos.codigoreporte} className="text-[#3b3b3b] border-solid border-[#cfcece79] border-b-2 " onDoubleClick={this.fnhandleBusquedaDetalles}>
                                                                <td className="px-4 py-2 text-xs ">{index + 1}</td>
                                                                <td className="px-4 py-2">{datos.detallereporte}</td>
                                                                <td className="px-4 text-center text-xs">{datos.cantidad}</td>
                                                                <td className="px-4 text-right">{fnFormatearPrecio(datos.importeRow)}</td>
                                                            </tr>
                                                        ))}
                                                        <tr className=" text-[#ffffff] bg-[#fd341e]">
                                                            <td className="px-4 py-2 text-left" colSpan={2}>Total:</td>
                                                            <td className="px-4 text-center">
                                                                {this.state.reportBusqueda && this.state.reportBusqueda.length > 0 && (
                                                                    <>
                                                                        {this.state.reportBusqueda[0].reduce((total, item) => total + item.cantidad, 0)}
                                                                    </>
                                                                )}

                                                            </td>
                                                            <td className="px-4 text-right ">

                                                                {this.state.reportBusqueda && this.state.reportBusqueda.length > 0 && (
                                                                    <>
                                                                        {fnFormatearPrecio(this.state.reportBusqueda[0].reduce((total, item) => total + item.importeRow, 0))}
                                                                    </>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                                    :
                                                    <tr className="text-[#3b3b3b]">
                                                        <td className="px-4 py-2 text-center" colSpan="4">No hay datos disponibles</td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        {/* 2° Tabla de Busqueda de Ingresos Detallada */}
                        <div className={`w-full  cursor-pointer bg-[#ffffff]  ${MostrarBusquedaDetalle ? "block" : "hidden"}`}>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#696969]">
                                        <tr className="text-[#ffffff]">
                                            <th className="font-normal">N°</th>
                                            <th className="px-4 font-normal text-left">Detalle</th>
                                            <th className="px-4 font-normal py-2">Cantidad</th>
                                            <th className="font-normal px-4 text-right">Importe</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {
                                            reportBusquedaDetallada.length > 0 ? (
                                                <>
                                                    {reportBusquedaDetallada[0].map((datos, index) => (

                                                        <tr key={index} className="cursor-pointer text-[#3b3b3b] border-solid border-[#cfcece79] border-b-2" attr={datos.codigoreporte} onDoubleClick={this.fnhandleMasBusquedaDetalles}>
                                                            <td className="px-4 py-2 text-xs ">{index + 1}</td>
                                                            <td className="px-4 py-2">{datos.detallereporte}</td>
                                                            <td className="px-4 text-xs text-center ">{datos.cantidad}</td>
                                                            <td className="px-4 text-right">{fnFormatearPrecio(datos.importeRow)}</td>
                                                        </tr>
                                                    ))}
                                                    <tr className=" text-[#ffffff] bg-[#fd341e]">
                                                        <td className="px-4 py-2 text-left" colSpan={2}>Total:</td>
                                                        <td className="px-4 text-center">
                                                            {this.state.reportBusquedaDetallada && this.state.reportBusquedaDetallada.length > 0 && (
                                                                <>
                                                                    {this.state.reportBusquedaDetallada[0].reduce((total, item) => total + item.cantidad, 0)}
                                                                </>
                                                            )}

                                                        </td>
                                                        <td className="px-4 text-right">

                                                            {this.state.reportBusquedaDetallada && this.state.reportBusquedaDetallada.length > 0 && (
                                                                <>
                                                                    {fnFormatearPrecio(this.state.reportBusquedaDetallada[0].reduce((total, item) => total + item.importeRow, 0))}
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                                :
                                                <tr className="text-white">
                                                    <td className="px-4 py-2 text-center" colSpan="4">No hay datos disponibles</td>
                                                </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 3° Tabla de Ingresos más detallos de la busqueda */}
                <div id="MasDetalleBusqueda" className={`fixed top-0  cursor-pointer right-0 h-screen lg:w-5/12 bg-[#fff] w-full md:w-7/12 overflow-auto ${MostrarMasDetalleBusquedas ? "block" : "hidden"}`} >
                    <div className="text-2xl  bg-[#504f4f] flex justify-start p-2  ">
                        <span className=" text-[#f0f0f0] hover:text-[#FF3B26] transition-colors" onClick={this.fnOcultarMasBusquedaDetalle}><FaRegTimesCircle /></span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#696969]">
                                <tr className="text-white ">
                                    <th className="font-normal">N°</th>
                                    <th className="px-4 font-normal text-left"> Detalle</th>
                                    <th className="px-4 font-normal py-2">Cantidad</th>
                                    <th className=" font-normal px-4 text-right">Importe</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {
                                    reportMasDetalleBusqueda.length > 0 ? (
                                        <>
                                            {reportMasDetalleBusqueda[0].map((datos, index) => (

                                                <tr key={datos.codigoreporte} attr={datos.codigoreporte} className="cursor-pointer text-[#3b3b3b] border-solid border-[#cfcece79] border-b-2 " onDoubleClick={this.fnhandleBusquedaDetalles}>
                                                    <td className="px-4 py-2 text-xs">{index + 1}</td>
                                                    <td className="px-4 py-2">{datos.detallereporte}</td>
                                                    <td className="px-4 text-xs text-center ">{datos.cantidad}</td>
                                                    <td className="px-4 text-right ">{fnFormatearPrecio(datos.importeRow)}</td>
                                                </tr>
                                            ))}
                                            <tr className=" text-[#ffffff] bg-[#fd341e]">
                                                <td className="px-4 py-2 text-left" colSpan={2}>Total:</td>
                                                <td className="px-4  text-xs text-center ">
                                                    {this.state.reportMasDetalleBusqueda && this.state.reportMasDetalleBusqueda.length > 0 && (
                                                        <>
                                                            {this.state.reportMasDetalleBusqueda[0].reduce((total, item) => total + item.cantidad, 0)}
                                                        </>
                                                    )}
                                                </td>
                                                <td className="px-4 text-right ">

                                                    {this.state.reportMasDetalleBusqueda && this.state.reportMasDetalleBusqueda.length > 0 && (
                                                        <>
                                                            {fnFormatearPrecio(this.state.reportMasDetalleBusqueda[0].reduce((total, item) => total + item.importeRow, 0))}
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                        :
                                        <tr className="text-[#3b3b3b]">
                                            <td className="px-4 py-2 text-center" colSpan="4">No hay datos disponibles</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        );
    }
}
export default Dashboard2;