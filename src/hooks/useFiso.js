import { useReducer } from "react"
import { formReducer } from "../reducers/formReducer"


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

    return {
        solicitud,
        handlerInitialFiso,
        handlerId,
    };

}