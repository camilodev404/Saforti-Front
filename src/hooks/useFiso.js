import { useReducer } from "react"
import { formReducer } from "../reducers/formReducer"


const initialFiso = {
    nroformulario: "",
    departamentosForm: "",
    municipiosForm: "",
    fecha: "", 
    tipoentrada: "",
    idbarrido: "",
    declaroverdad: null,
    autorizacion: null,
    autconyuge: null,
    idfuncionario: "",
    haSidoBeneficiario: null,
    acreditaBeneficio: null,
    idAcreditacion: "",
    numResolucion: "",
    fechaAcreditacion: "",
}

export const useFiso = () => {

    const [ solicitud, dispatch ] = useReducer(formReducer, initialFiso);

    const handlerInitialFiso = (formvalues) => {
        dispatch({
            type: 'formValues',
            payload: formvalues,
        });
    }

    const handlerId = (id) => {
        dispatch({
            type: 'id',
            payload: id,
        });
    }

    const handlerAuths = (auths) => {
        dispatch({
            type: 'autorizaciones',
            payload: auths,
        });
    }

    const handlerVerificacion = (verificaciones) => {
        dispatch({
            type: 'verificaciones',
            payload: verificaciones,
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
        handlerAuths,
        handlerVerificacion,
    };

}