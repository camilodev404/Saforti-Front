import { useReducer } from "react";
import { predioUsuarioReducer } from "../reducers/predioUsuarioReducer";

const initialPredioUsuario = {
    idPredio: "",
    cedula: "",
    derechoSobrePredio: "",
    tieneDatos: null,
    nombre: "",
    ubicacion: "",
    telefono: "",
    legalizarJuridica: null,
    inicioTramite: null,
    entidad: "",
    fechaSolicitud: "",
    numSolicitud: "",
    habitaExplota: "",
    fechaHabitaExplota: "",
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

    return {
        predioUsuario,
        handlerRelacionJuridica,
    };

}