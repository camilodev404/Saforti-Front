import { useReducer } from "react"
import { formReducer } from "../reducers/formReducer"
import { findAllDeptosForm, findMunByDeptoForm, generateFormId } from "../services/formularioService";


const initialFiso = {
    nroformulario: null,
    departamentosForm: null,
    municipiosForm: null,
    fecha: null, 
    tipoentrada: null,
    idbarrido: null,
}

export const useFiso = () => {

    const [ solicitud, dispatch ] = useReducer(formReducer, initialFiso);

    const generateFormularioId = () => {
        const id =  generateFormId();
        dispatch({
            type: 'id',
            payload: id,
        });
    }



    return {
        generateFormularioId,
        solicitud,
    };

}