import React, { Component } from "react";
import fileContent from "../assets/LeerAPI";
import { componentDidMountLlenarComboboxTipoReporte, componentDidMountLlenarComboboxUsuario, componentDidMountLlenarComboboxFiltroIngresos } from "../Funcions/Fun_Globales"



// import "./Dashboard.scss";
import { startOfMonth } from 'date-fns';
import { BiClipboard, BiLock, BiPhone, BiQr, BiServer, BiSpeaker } from "react-icons/bi";



//fecha Actual
const today = new Date();

//FechaInicial 
const startOfMonthDate = startOfMonth(today);

//Variable para mapear el resultado del usuario
let resultUser = [];

//Llenar Combobox FiltroIngresos
const cboFiltroIngresos = await componentDidMountLlenarComboboxFiltroIngresos("cboFiltrarIngresos","idOperacion", "cNombreOperacion", "OperacionHusat", "cTipoOpe", 4, true);
console.log(cboFiltroIngresos);

//Llenar Combobox TipoReporte
const cboTipoReport = await componentDidMountLlenarComboboxTipoReporte("TRPT", true);

//Crear una funcion
const IconCodigo = (codigo) => {
    let heartIcon = null; // Cambiamos la declaración a 'let'

    if (codigo === "00000005") {
        heartIcon = <BiPhone />;
    } else if (codigo === "00000004") {
        heartIcon = <BiQr />;
    } else if (codigo === "00000002") {
        heartIcon = <BiServer />;
    } else if (codigo === "00000003") {
        heartIcon = <BiSpeaker />;
    }

    return heartIcon;
}





console.log("Dia final" + today);
console.log("Dia Uno" + startOfMonthDate);
const cboUserInicial = await componentDidMountLlenarComboboxUsuario(true, startOfMonthDate, today, true, 0);


class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            reportes: [],
            opcionesComboBox: [],
            isChecked: true,
            resultUser: [],
        };


    }
    // const [dataArray, setDataArray] = useState([]);

    //CheckBox
    handleChange = () => {
        this.setState(prevState => ({
            isChecked: !prevState.isChecked
        }));
    };

    //dateTime Inicio
    handleDateChange = async (event) => {

        //Mostrar fechaInicio-FechaFinal
        const dtFechaInicio = document.getElementById('fechaInicio')
        const dtFechaInicioValor = dtFechaInicio.value;
        const dtFechaFinal = document.getElementById('fechaFinal');
        const dtFechaFinalValor = dtFechaFinal.value;

        let chekeckFecha = this.state.isChecked;

        console.log(this.state.isChecked);
        this.setState({
            resultUser: await componentDidMountLlenarComboboxUsuario(chekeckFecha, dtFechaInicioValor, dtFechaFinalValor, true, 0),
        });
        console.log(dtFechaInicioValor);
        console.log(dtFechaFinalValor);


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

        // console.log(cboUsuarios);

        // console.log("Tamaño " + reportes.length);
        // this.componentDidMountObtenerContenedores();
        return (

            <div className="  p-0">

                <div className="dvContenedorSupeior mb-3 border-b-2 border-[#ccc] ">
                    <div className="  items-center  mb-5 p-1 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-1 rounded-md  justify-center ">
                        <div className="w-56 ">
                            <h1></h1>

                        </div>

                        <div className=" lg:w-56 flex">
                            <div className="bg-[#696969] items-baseline justify-around  w-full p-0 rounded-xl">


                                <div className=" flex w-full justify-center p-1 ">
                                    <p className="ciPanelSupeior  text-sm flex justify-around text-white"> COPIAS</p>
                                </div>

                                <div className="ciPanelCentral flex items-center justify-around">

                                    <div className="pcCantidad  text-4xl p-2">
                                        <h1 className="text-white">50</h1>
                                    </div>

                                    <div className="pcImg text-white ">
                                        <BiClipboard className="  text-2xl " />
                                    </div>

                                </div>
                                <div className="bg-[#0202027e]  p-1 rounded-bl-xl rounded-br-xl ">
                                    <p className="ciPanelSupeior text-sm flex justify-around text-white "> Cantidad de copias</p>
                                </div>
                            </div>
                        </div>
                        <div className="  lg:w-56 dvCopias  rounded-md  ">
                            <div className="bg-[#2A6D75] items-baseline justify-around  w-full p-0 rounded-xl">


                                <div className=" flex w-full justify-center p-1 ">
                                    <p className="ciPanelSupeior  text-sm flex justify-around text-white"> CAJA CHICA</p>
                                </div>

                                <div className="ciPanelCentral flex items-center justify-around">

                                    <div className="pcCantidad  text-4xl p-2">
                                        <h1 className="text-white">50</h1>
                                    </div>

                                    <div className="pcImg text-white ">
                                        <BiLock className="  text-4xl " />
                                    </div>

                                </div>
                                <div className="bg-[#114449a1]  p-1 rounded-bl-xl rounded-br-xl ">
                                    <p className="ciPanelSupeior text-sm flex justify-around p-0 text-white "> Cantidad de Dinero</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-56 ">
                            <h1>

                            </h1>
                        </div>
                    </div>

                </div>



                <div className="dvContenedorInferior  items-center  mb-5 p-1 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-1 rounded-md  justify-center">
                    {
                        reportes.map((reporte) => (
                            <div className={`  md:w-56 mb-3 dvContenedoresInferiores  ${reporte.codigoreporte == "00000005" ? "bg-[#861B2D]" : reporte.codigoreporte == "00000004" ? "bg-[#AD7311]" : reporte.codigoreporte == "00000002" ? "bg-[#007E3F]" : "bg-[#A11401]"}  p-0 rounded-bl-lg rounded-xl`} key={reporte.codigoreporte} >
                                <div className=" flex w-full justify-center p-1 ">

                                    <p className="ciPanelSupeior  text-sm flex justify-around  text-white">{reporte.detallereporte}</p>
                                </div>

                                <div className="ciPanelCentral flex items-center justify-around m-2">

                                    <div className="pcCantidad text-4xl text-white">{reporte.cantidad}
                                    </div>

                                    <div className="pcImg  ">
                                        <h1 className=" text-4xl text-white">{IconCodigo(reporte.codigoreporte)}</h1>

                                    </div>

                                </div>
                                <div className=" bg-[#13131377] flex  items-center justify-center rounded-bl-lg  rounded-br-xl ">
                                    <p className="ciPanelDetalle  m-1 text-white text-sm ">{reporte.masDetallereporte}</p>
                                </div>

                            </div>
                        ))
                    }
                </div>





                <div className="dvDetalleGeneral  w-full mt-4 grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-1 gap-1 rounded-md">
                    <div className="" >
                        <div className=" bg-[#3D3D3D] placeholder:items-baseline justify-around  w-full  rounded-xl  grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-1 gap-1">
                            <div className=" bg-[#696969] b rounded-t-xl w-full p-2">
                                <div className="grid  lg:grid-cols-5 md:grid-cols-3 gap-3 " >
                                    <div className="  mr-4 text-white">
                                        Buscar por

                                    </div>

                                    <div className="  w-full mr-3">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-5 w-5"
                                                checked={isChecked}
                                                onChange={this.handleChange}
                                            />
                                            <span className="ml-2 text-white " >Habilitar Fechas</span>

                                        </label>
                                    </div>
                                    <div className=" w-full mr-3">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 " />
                                            <span className="ml-2 text-white ">Día Especifico</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="  w-full pt-2 pb-2  p-2 ">
                                <div className=" grid  w-full lg:grid-cols-2">
                                    <div className="  marker:dvFechas grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2   lg:grid-cols-2 gap-2 mb-2 ">
                                        <div className=" dvFechaIncial w-full ml-1 mr-2  ">
                                            <h1 className=" text-white mr-2 ">
                                                Fecha Inicial
                                                <input
                                                    type="date"
                                                    id="fechaInicio"
                                                    name="fecha"
                                                    className="flex w-full text-black p-1 rounded-md"
                                                    defaultValue={startOfMonthDate.toISOString().split('T')[0]}
                                                    onChange={this.handleDateChange}
                                                />
                                            </h1>
                                        </div>
                                        <div className=" dvFechaIncial w-full ml-1 mr-2  ">
                                            <h1 className=" text-white mr-2 ">
                                                Fecha Final
                                                <input
                                                    type="date"
                                                    id="fechaFinal"
                                                    name="fecha"
                                                    className="flex w-full text-black p-1 rounded-md"
                                                    defaultValue={today.toISOString().split('T')[0]}
                                                    //se ejecuta cuando hay cualquier cambio (onChenge)
                                                    onChange={this.handleDateChange}
                                                />

                                            </h1>
                                        </div>
                                    </div>
                                    <div className=" dvReport-User grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-2   gap-2 mb-2 ">

                                        <div className="dvTipoReporte w-full ml-1 mr-2">
                                            <h1 className="mr-2 text-white">Tipo reporte</h1>
                                            <select style={{ fontSize: '12px' }} className="flex w-full p-2 mr-2 text-black">

                                                {cboTipoReport.map((opcion) => (
                                                    //key=lo que identifica
                                                    <option key={opcion.cCodTab} value={opcion.cCodTab}>
                                                        {opcion.cNomTab}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className="dvUsuario w-full ">
                                            <h1 className=" text-white  ml-1 mr-1   ">
                                                Usuario

                                                <select style={{ fontSize: '12px' }} className="flex w-full p-2 mr-2 text-black">
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
                                            <h1 className="  text-white ml-1 mr-1    ">
                                                Buscar
                                                <form className=" flex items-center">
                                                    <input type="search" placeholder="" className=" text-black w-full border-t border-l border-b border-[#FF3B26] p-0.5 run  focus:outline-none focus:border-[#FF3B26] rounded-l " />
                                                    <button type="submit" className="bg-[#ffffff] text-black p-0.5 rounded-r border-r border-t border-b border-[#FF3B26]">Buscar</button>
                                                </form>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="dvCuerpoDG  flex m-2">
                                </div>

                            </div>
                        </div>
                    </div>





                    <div className=" bg-[#3D3D3D]  p-1 w-full grid grid-cols-1  rounded-md">
                        <div className=" w-full  flex items-center justify-center gird grid-cols-2   ">
                            <div className="text-[#272527] flex w-full p-2">

                                <div className="text-[#ffffff] p-2  flex">
                                    <span>
                                        •
                                    </span>
                                    <span className="flex mr-4 lg:mr-8">
                                        Ingresos
                                    </span>

                                </div>

                                <div className="flex w-full p-2  ">
                                    <h1 className="text-[#ffffff] md:pr-5 md:pl-9 lg:pl-48  lg:pr-2 pe-1">Filtrar</h1>
                                    <select style={{ fontSize: '12px' }} className="flex w-full md:w-60 p-2 mr-2 text-black">

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




                    <div className="bg-[#696969] w-full flex justify-around  ">
                        <div className="w-full">
                            <table className=" w-full  ">
                                <thead className="   ">
                                    <tr className=" p-4">
                                        <th className="  ">ID</th>
                                        <th >Nombre</th>
                                        <th>Apellido</th>
                                        <th>Edad</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-[#3D3D3D]">
                                    <tr className="   ">
                                        <td className="  text-center">1</td>
                                        <td className="  text-center  ">John</td>
                                        <td className="  text-center">Doe</td>
                                        <td className="  text-center">30</td>
                                    </tr>

                                </tbody>
                                <tbody className="bg-[#3D3D3D]">
                                    <tr className="   ">
                                        <td className="  text-center">1</td>
                                        <td className="  text-center  ">John</td>
                                        <td className="  text-center">Doe</td>
                                        <td className="  text-center">30</td>
                                    </tr>

                                </tbody>
                                <tbody className="bg-[#3D3D3D]">
                                    <tr className="   ">
                                        <td className="  text-center">1</td>
                                        <td className="  text-center  ">John</td>
                                        <td className="  text-center">Doe</td>
                                        <td className="  text-center">30</td>
                                    </tr>

                                </tbody>
                                <tbody className="bg-[#3D3D3D]">
                                    <tr className="   ">
                                        <td className="  text-center">1</td>
                                        <td className="  text-center  ">John</td>
                                        <td className="  text-center">Doe</td>
                                        <td className="  text-center">30</td>
                                    </tr>

                                </tbody>
                                <tbody className="bg-[#3D3D3D]">
                                    <tr className="   ">
                                        <td className="  text-center">1</td>
                                        <td className="  text-center  ">John</td>
                                        <td className="  text-center">Doe</td>
                                        <td className="  text-center">30</td>
                                    </tr>

                                </tbody>
                                <tbody className="bg-[#3D3D3D]">
                                    <tr className="   ">
                                        <td className="  text-center">1</td>
                                        <td className="  text-center  ">John</td>
                                        <td className="  text-center">Doe</td>
                                        <td className="  text-center">30</td>
                                    </tr>

                                </tbody>
                                <tbody className="bg-[#3D3D3D]">
                                    <tr className="   ">
                                        <td className="  text-center">1</td>
                                        <td className="  text-center  ">John</td>
                                        <td className="  text-center">Doe</td>
                                        <td className="  text-center">30</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>




                    </div>

                </div>
            </div>
        );
    }
}
export default Dashboard;