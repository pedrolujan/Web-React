import axios from 'axios';
import fileContent from "../assets/LeerAPI";

//Llenar ComboBox
export async function componentDidMountLlenarComboboxTipoReporte(_CodTab, _Buscar) {
  
  try {
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
export async function componentDidMountLlenarComboboxFiltroIngresos(nomCombobox,nomCampoId,nomCampoNombre,nomTabla,nomEstado,condicionDeEstado,buscar) {
  
  try {
    const params = {
      _nomCombobox:nomCombobox,
      _nomCampoId: nomCampoId,
      _nomCampoNombre: nomCampoNombre,
      _nomTabla:nomTabla,
      _nomEstado:nomEstado,
      _condicionDeEstado:condicionDeEstado,
      _buscar:buscar
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

//Llenar ComboBox Usuario
export async function componentDidMountLlenarComboboxUsuario(HabilitarFecha, dFechaInicial,dFechaFinal,bEstado,idUsuario) {
    
    try {
      const params1 = {
        _habilitarFechas: HabilitarFecha,
        _dFechaInicial: dFechaInicial,
        _dFechaFinal: dFechaFinal,
        _bEstado: bEstado,
        _idUsuario:idUsuario
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



