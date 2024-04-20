import { useReducer } from "react";
import { predioUsuarioReducer } from "../reducers/predioUsuarioReducer";

const initialPredioUsuario = {
    id : {
        idPredio: "",
        cedula: "",
    },
    derechoSobrePredio: "",
    tieneDatos: null,
    nombre: "",
    ubicacion: "",
    telefono: "",
    legalizarJuridica: null,
    inicioTramite: null,
    entidad: "",
    fechaSolicitud: null,
    numSolicitud: "",
    habitaExplota: null,
    fechaHabitaExplota: null,
    explotaciones: "",
    explotanOtros: null,
    derechoExplotacion: ""
}

export const usePredioUsuario = () => {

    const [ predioUsuario, dispatch ] = useReducer(predioUsuarioReducer, initialPredioUsuario);

    const handlerRelacionJuridica = (relaciones) => {
        dispatch({
            type: 'firstPredioUsuario',
            payload: relaciones,
        });
    }

    const handlerSecondUpdate = (predUsr) => {
        dispatch({
            type: 'secondUpdate',
            payload: predUsr,
        });
    }

    const handleResetPredioUsuario = () =>{
        dispatch({
            type: 'reset'
        });
    }

    return {
        predioUsuario,
        handlerRelacionJuridica,
        handlerSecondUpdate,
        handleResetPredioUsuario,
    };

}