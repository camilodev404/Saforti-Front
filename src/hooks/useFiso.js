import { useReducer } from "react"
import { formReducer } from "../reducers/formReducer"


const initialFiso = {
    nroformulario: "",
    departamentosForm: "",
    municipiosForm: "",
    fecha: "", 
    tipoentrada: "",
    idbarrido: "",
}

export const useFiso = () => {

    const [ solicitud, dispatch ] = useReducer(formReducer, initialFiso);

    const handlerInitialFiso = (formvalues) => {
        dispatch({
            type: 'formValues',
            payload: formvalues,
        })
    }

    const handlerId = (id) => {
        dispatch({
            type: 'id',
            payload: id,
        });
    }

    const handlerResetValuesForm = () => {
        dispatch({
            type: 'reset'
        });
    }

    return {
        solicitud,
        handlerInitialFiso,
        handlerId,
        handlerResetValuesForm,
    };

}