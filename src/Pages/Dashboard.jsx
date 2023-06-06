import React, { Component } from "react";

// import "./Dashboard.scss";


// import 'bootstrap/dist/css/bootstrap.css';


class Dashboard extends React.Component {
    state = {
        reportes: [],
    };

    async componentDidMount() {
        try {

            const params = {
                _tipoCon: "-1",
            };

            const baseurl = new URL(
                "https://442d-2800-4b0-8010-2d1a-e1b9-7d15-f9d3-b6fe.ngrok.io/Dashboard/ListarContenedores"
            );
            baseurl.searchParams.append("_tipoCon", params._tipoCon);

            const response = await fetch(baseurl);
            const data = await response.json();
            console.log(data);

            this.setState({
                reportes: data.result
            });
        } catch (error) {
            console.error("Error al obtener los datos de la API:", error);
        }
    }
    render() {
        const { reportes } = this.state;
        console.log("Tamaño " + reportes.length);
        return (
            <div>
                <div className="dvContenedorSupeior">

                    <div className="dvCopias">
                        <h1>Copias</h1>
                    </div>

                    <div className="dvCajaChica">
                        <h1>CajaChica</h1>
                    </div>
                </div>

                <div className="dvContenedorInferior">
                    {
                        reportes.map((reporte) => (


                            <div className="dvContenedoresInferiores" key={reporte.codigoreporte}>
                                <div>
                                    <p className="ciPanelSupeior">{reporte.detallereporte}</p>
                                </div>

                                <div className="ciPanelCentral">
                                    <div className="pcImg">
                                        <p>hhj</p>
                                    </div>

                                    <div className="pcCantidad">{reporte.cantidad}
                                    </div>
                                </div>

                                <div>
                                    <p className="ciPanelDetalle">{reporte.masDetallereporte}</p>
                                </div>

                            </div>
                        ))
                    }
                </div>

                <div className="dvDetalleGeneral">

                </div>
            </div>
        );
    }
}
export default Dashboard;