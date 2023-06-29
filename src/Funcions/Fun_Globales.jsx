import axios from 'axios';
import fileContent from "../assets/LeerAPI";
// [Las funciones son todas similares, solo dependera de los parametros que se desee enviar]

//FormatoNombre Primera Letra Mayuscula y las demas minisculas [Michel Francisco Rojas Campos] 
export function FormatearNombre(cadena) {
  return cadena
    .split(" ")
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(" ");
}

//Llenar ComboBox
export async function componentDidMountLlenarComboboxTipoReporte(_CodTab, _Buscar) {
  try {
    //Parametros que vienen de la BD, les ortorgamos una variable para usarlas posteiormente
    //no significa que debe ser igual, si no entendible
    const params = {
      _CodTab: _CodTab,
      _Buscar: _Buscar
    };
    const response = await axios.get(fileContent + "General/LlenarCombobox", {
      params: params
    });
    // console.log(response.data);
    return response.data.result;
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
    return null;
  }
}

//Llenar Filtro de Ingresos
export async function componentDidMountLlenarComboboxFiltroIngresos(nomCombobox, nomCampoId, nomCampoNombre, nomTabla, nomEstado, condicionDeEstado, buscar) {
  try {
    const params = {
      _nomCombobox: nomCombobox,
      _nomCampoId: nomCampoId,
      _nomCampoNombre: nomCampoNombre,
      _nomTabla: nomTabla,
      _nomEstado: nomEstado,
      _condicionDeEstado: condicionDeEstado,
      _buscar: buscar
    };
    const response = await axios.get(fileContent + "General/LlenarComboboxSegunTabla", {
      params: params
    });
    // console.log(response.data);
    return response.data.result;
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
    return null;
  }
}

//Funcion ImporteCaja
export async function fnImporteCaja(fechaActual, idUsuario) {
  try {
    const paramentros = {
      _fechaActual: fechaActual,
      _idUsuario: idUsuario
    }
    const response = await axios.get(fileContent + "General/obtener-importe-caja", {
      params: paramentros
    })
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
    return null;
  }
}

//Funcion para los items de Sidebar
export async function SidebarItems(idUsuario, idAplicacion) {
  try {
    const paramentros = {
      _idUsuario: idUsuario,
      _idAplicacion: idAplicacion
    }
    const response = await axios.get(fileContent + "menu/listar-accesos", {
      params: paramentros
    })
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
    return null;
  }
}

//Funcion para Realizar la busqueda de consultas [AccesoDirecto]
export async function fnBuscarConsultas(pcBuscar, tipoCon) {
  try {
    const paramentros = {
      _pcBuscar: pcBuscar,
      _tipoCon: tipoCon
    }
    const response = await axios.get(fileContent + "consultas/buscar-consultas", {
      params: paramentros
    })
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
    return null;
  }
}

//Llenar ComboBox Usuario
export async function componentDidMountLlenarComboboxUsuario(HabilitarFecha, dFechaInicial, dFechaFinal, bEstado, idUsuario) {
  try {
    const params1 = {
      _habilitarFechas: HabilitarFecha,
      _dFechaInicial: dFechaInicial,
      _dFechaFinal: dFechaFinal,
      _bEstado: bEstado,
      _idUsuario: idUsuario
    };
    const response = await axios.get(fileContent + "General/LlenarUsuariosConAccion", {
      params: params1
    });
    return response.data.result;
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
    return null;
  }
}

//BuscarUsuario
export async function componentDidMountBuscarIngresos(OnFecha, OnDiaEspefico, dtFechaIni, dtFechaFin, codigo1, codigo2, codigo3, codigo4, codigo5, codigo6, codigo7, buscar, numPagina, tipoCon, idUsuario) {
  try {
    const params1 = {
      _chkActivarFechas: OnFecha,
      _chkActivarDia: OnDiaEspefico,
      _dtFechaIni: dtFechaIni,
      _dtFechaFin: dtFechaFin,
      _cod1: codigo1,
      _cod2: codigo2,
      _cod3: codigo3,
      _cod4: codigo4,
      _cod5: codigo5,
      _cod6: codigo6,
      _cod7: codigo7,
      _cBuscar: buscar,
      _numPagina: numPagina,
      _tipoCon: tipoCon,
      _idUsuario: idUsuario

    };
    const response = await axios.get(fileContent + "Dashboard/ObtenerIngresos", {
      params: params1
    });
    return response.data.result;
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
    return null;
  }
}



