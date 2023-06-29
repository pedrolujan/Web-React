
//Importes de los archivos .js
import React, { Component, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Usuario from "./Components/Usuario";
import Login from './Components/Login';
import Sidebar from "./Components/Sidebar";
import { SidebarItems } from './Funcions/Fun_Globales';

// import H8888900100 from './Pages/Dashboard'
import H8888710001h1 from './Pages/Emitir-Documento-Venta'
import H8888700101h3 from './Pages/Opciones-Producto'
import H8888770001h4 from './Pages/Registro-Almacen'
import H8888700101h6 from './Pages/Registro-Sucursal'
import H8888700103h7 from './Pages/Ajuste-Inventario'
import H8888500001h9 from './Pages/TsSistemas'
import H8888500002h10 from './Pages/TsAccesos'
import H8888700103h11 from './Pages/Venta-por-Mayor'
import H8888500003h12 from './Pages/TsCaja'
import H8888500004h13 from './Pages/TsVenta'
import H8888500005h14 from './Pages/TsCompra'
import H8888500006h15 from './Pages/TsTraslado'
import H8888500007h16 from './Pages/TsApertura'
import H8888500008h17 from './Pages/TsExtorna'
import H8888700104h18 from './Pages/Ganancia-por-Rango-Fechas'
import H8888500009h20 from './Pages/TsConsulta'
import H8888500010h21 from './Pages/TsDeuda'
import H8888700101h23 from './Pages/Registro-Ubigeo'
import H8888900100h30 from './Pages/Registrar-Cliente'
import H8888920001h31 from './Pages/Registrar-Vehiculo'
import H8888600104h33 from './Pages/Registrar-Accesorio'
import H8888600105h34 from './Pages/Registrar-Equipo'
// import H8888600102h35 from './Pages/Clientes'
import H8888730001h36 from './Pages/Registrar-Categoria-Marca-Modelo'
import H8888600104h37 from './Pages/Registrar-Sim-Card'
import H8888600101h38 from './Pages/Asignar-Sim-Card-a-Cuenta'
import H8888600101h41 from './Pages/Asignar-IMEI-SERIES'
import H8888940001h42 from './Pages/Registrar-Tipo-Plan'
import H8888900102h43 from './Pages/Registrar-Plan'
import H8888600103h44 from './Pages/Registrar-Orden-Compra'
import H8888200101h45 from './Pages/Registrar-Cargo'
import H8888200102h46 from './Pages/Registrar-Empleado'
import H8888800101h48 from './Pages/Realiza- Venta-Renovaciones'
import H8888700101h50 from './Pages/Registrar-Clase-Marca-Modelo'
import H8888760001h51 from './Pages/Registrar-Modelo'
import H8888930001h53 from './Pages/Realizar-Seguimiento'
import H8888300101h55 from './Pages/Activacion-Equipos'
import H8888950001h61 from './Pages/Consultas'
import H8888900102h62 from './Pages/Comparacion-Planes'
import H8888600104h64 from './Pages/Visualizar-equipos-asignados-Orden-Compra'
import H8888800102h65 from './Pages/Cambio-Titularidad-Cambio Vehicular'
import H8888800101h67 from './Pages/Instalaciones-GPS'
import H8888800103h68 from './Pages/Venta-Especifica'
import H8881000011h69 from './Pages/Control-Pagos-Mensuales'
import H8888800105h72 from './Pages/Buscar-Ventas'
import H8888600105h73 from './Pages/Sim-Card-Masivo'
import H8888300102h75 from './Pages/Reactivaciones'
import H8888300301h78 from './Pages/Cambio-Titularidad'
import H8888820001h82 from './Pages/Anulaciones'
import H8888500013h83 from './Pages/TsSeguimiento'
import H8888800106h84 from './Pages/Pagos-Pendientes'
import H8888960002h85 from './Pages/Reporte-Renovaciones'
import H8888960003h88 from './Pages/Reporte-Ventas'
import H8888960001h90 from './Pages/Servicios'
import H8888740001h92 from './Pages/Doc.Venta-serie-correlativo'
import H8888900102h94 from './Pages/Reporte-seguimiento'
import H8888960001h95 from './Pages/Reporte-Recaudacion'
import H8888960004h96 from './Pages/Reporte-Comisiones'

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

const componentes = {
  //Emitir Documento de Venta
  'H8888710001h1': H8888710001h1,
  //Opciones de Producto
  'H8888700101h3': H8888700101h3,
  //Registro de Almacén
  'H8888770001h4': H8888770001h4,
  //Registro de Sucursal
  'H8888700101h6': H8888700101h6,
  //Ajuste de Inventario
  'H8888700103h7': H8888700103h7,
  //tsSistemas
  'H8888500001h9': H8888500001h9,
  //tsAccesos
  'H8888500002h10': H8888500002h10,
  //Venta por Mayor
  'H8888700103h11': H8888700103h11,
  //tsCaja
  'H8888500003h12': H8888500003h12,
  //tsVenta
  'H8888500004h13': H8888500004h13,
  //tsCompra
  'H8888500005h14': H8888500005h14,
  //tsTraslado
  'H8888500006h15': H8888500006h15,
  //tsApertura
  'H8888500007h16': H8888500007h16,
  //tsExtorna
  'H8888500008h17': H8888500008h17,
  //Ganancia por Rango de Fechas
  'H8888700104h18': H8888700104h18,
  //tsConsulta
  'H8888500009h20': H8888500009h20,
  //tsDeuda
  'H8888500010h21': H8888500010h21,
  //Registro de Ubigeo
  'H8888700101h23': H8888700101h23,
  //Registrar Cliente
  'H8888900100h30': H8888900100h30,
  //Registrar Vehículo
  'H8888920001h31': H8888920001h31,
  //Registrar Accesorio
  'H8888600104h33': H8888600104h33,
  //Registrar Equipo
  'H8888600105h34': H8888600105h34,
  //Asignar IMEI y SERIES a Orden de Compra (Formulario Prueba)
  // 'H8888600102h35': H8888600102h35,
  //Registrar : Categoria / Marca / Modelo
  'H8888730001h36': H8888730001h36,
  //Registrar Sim Card
  'H8888600104h37': H8888600104h37,
  //Asignar Sim Card a Cuenta
  'H8888600101h38': H8888600101h38,
  //Asignar IMEI y SERIES a Orden de Compra
  'H8888600101h41': H8888600101h41,
  //Registrar Tipo de Plan (Tiempo)
  'H8888940001h42': H8888940001h42,
  //Registrar Plan (Servicio)
  'H8888900102h43': H8888900102h43,
  //Registrar Orden de Compra
  'H8888600103h44': H8888600103h44,
  //Registrar Cargo
  'H8888200101h45': H8888200101h45,
  //Registrar Empleado
  'H8888200102h46': H8888200102h46,
  //Realizar Venta / Renovaciones
  'H8888800101h48': H8888800101h48,
  //Registrar: Clase / Marca / Modelo
  'H8888700101h50': H8888700101h50,
  //Registrar Modelo
  'H8888760001h51': H8888760001h51,
  //Realizar Seguimiento
  'H8888930001h53': H8888930001h53,
  //Activación de Equipos
  'H8888300101h55': H8888300101h55,
  //Consultas
  'H8888950001h61': H8888950001h61,
  //Comparación de Planes
  'H8888900102h62': H8888900102h62,
  //Visualizar equipos asignados Orden de Compra
  'H8888600104h64': H8888600104h64,
  //Cambio Titularidad / Cambio Vehicular / otros Servicios
  'H8888800102h65': H8888800102h65,
  //Instalaciones de GPS
  'H8888800101h67': H8888800101h67,
  //Venta Especifica
  'H8888800103h68': H8888800103h68,
  //Control de Pagos Mensuales
  'H8881000011h69': H8881000011h69,
  //Buscar Ventas
  'H8888800105h72': H8888800105h72,
  //Sim Card Masivo
  'H8888600105h73': H8888600105h73,
  //Reactivaciones
  'H8888300102h75': H8888300102h75,
  //Cambio de Titularidad
  'H8888300301h78': H8888300301h78,
  //Anulaciones
  'H8888820001h82': H8888820001h82,
  //tsSeguimiento
  'H8888500013h83': H8888500013h83,
  //Pagos Pendientes
  'H8888800106h84': H8888800106h84,
  //Reporte de Renovaciones
  'H8888960002h85': H8888960002h85,
  //Reporte de Ventas
  'H8888960003h88': H8888960003h88,
  //Servicios
  'H8888960001h90': H8888960001h90,
  //Doc. Venta(serie y correlativo)
  'H8888740001h92': H8888740001h92,
  //Reporte de seguimiento
  'H8888900102h94': H8888900102h94,
  //Reporte de Recaudación
  'H8888960001h95': H8888960001h95,
  //Reporte de Comisiones
  'H8888960004h96': H8888960004h96

  // Agrega más componentes según sea necesario
};

class App extends Component {
  state = {
    menuGeneral: [],
    arrayElement: []
  }
  componentDidMount() {
    const idUsuario = getCookie('idUsuario');
    if (!idUsuario && window.location.pathname !== "/") {
      window.location.href = "/";
    }
    // console.log(idUsuario);

    //FuncionSidebar
    SidebarItems(idUsuario, 1)
      .then((data) => {

        // Si en el array los resultados son igual a [0] significa que son los padres del Menu
        let resultFiltradosPadres = data.result.filter((item) => item.cMenuPadre === "0");

        //Si en el array los resultados son diferentes a [0] significa que son los submenus
        let resultFiltradosHijos = data.result.filter((item) => item.cMenuPadre !== "0");

        let menuItem = [{
          id: "-01",
          path: "/dashboard",
          name: "Dashboard",
          ruta: "",
          submenu: [{
            subSubmenu: []
          }],
        }];
        data.result.filter((m) => m.cMenuPadre.toString() === "0")
          .map((mp) => {
            menuItem.push(
              {
                id: mp.cMenuCod.toString(),
                path: mp.path,
                name: mp.cMenuNombre,
                ruta: mp.rutaArchivo,
                submenu: data.result.filter((sm) => sm.cMenuPadre.toString() === mp.cMenuCod.toString())
                  .map((smenu) =>
                  (
                    {
                      id: smenu.cMenuCod.toString(),
                      path: "/" + smenu.path,
                      name: smenu.cMenuNombre,
                      ruta: smenu.rutaArchivo,
                      subSubmenu: mp.cMenuCod.toString() === '8888500000' ? //Filtramos todos los Padres menos el padre de accesoDirecto que se usa en el header
                        data.result.filter((sm) => sm.cMenuPadre.toString() === mp.cMenuCod.toString())
                          .map((ssubmenu) =>
                          (
                            {
                              id: ssubmenu.cMenuCod.toString(),
                              path: "/" + ssubmenu.path,
                              name: ssubmenu.cMenuNombre,
                              ruta: ssubmenu.rutaArchivo,
                            }
                          )) :
                        data.result.filter((ssm) => ssm.cMenuPadre.toString() === smenu.cMenuCod.toString())
                          .map((ssubmenu) =>
                          (
                            {
                              id: ssubmenu.cMenuCod.toString(),
                              path: "/" + ssubmenu.path,
                              name: ssubmenu.cMenuNombre,
                              ruta: ssubmenu.rutaArchivo,
                            }
                          ))
                    }
                  ))
              }
            )
          })
        this.setState({
          menuGeneral: menuItem
        })
        // console.log(this.state.menuGeneral);
        // console.log(menuItem);

      }).catch((error) => {
        console.log("Error al obtener los datos del Hijos:", error);
      })
  }
  render() {
    const { menuGeneral } = this.state
    // console.log(menuGeneral);
    const idUsuario = getCookie('idUsuario');
    return (
      <BrowserRouter >
        {!idUsuario ?
          //Reuteo del Login Si en la cookie de usuario no se encuentra , te redirecciona a Login aunque te encuentres en otro apartado de la pagina
          <Routes >
            <Route path="/" element={<Login />} />
          </Routes>
          :
          // Todo este ruteo es por parte del Sidebar y los Menus/SubMenus/SubMenusHijos
          <Sidebar >
            <Routes >
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/usuario" element={<Usuario />} />
              {
                menuGeneral.reduce((routes, mpa) => {

                  mpa.submenu.forEach((sm) => {

                    sm.subSubmenu.forEach((ssm) => {
                      const Componente = componentes[ssm.ruta];


                      if (Componente !== undefined) {

                        routes.push(
                          <Route
                            key={ssm.id}
                            // al momento de mapear las rutas, al compara el id del padre de accesos directos solo se agrega la ruta del padre y del hijo 
                            // en cambio si no es igual al id, se muestra la ruta del PeriodicWave,Hijo y SubHijo
                            path={mpa.id === "8888500000" ? `${ssm.path}` : `/${mpa.path + sm.path + ssm.path}`}
                            element={<Componente />}
                          />
                        );
                      }
                    })
                  })
                  return routes;
                }, [])}
            </Routes>
          </Sidebar>
        }
      </BrowserRouter>
    )
  }
}
export default App