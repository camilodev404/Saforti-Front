import { useReducer } from "react";
import { predioReducer } from "../reducers/predioReducer";

const initialPredio = {
    idPredio: "",
    numPredialAnti: "",
    nupre: "",
    idMunicipio: "",
    numPredialNal: "",
    numFolio: "",
    vereda: "",
    corregimiento: "",
    centroPoblado: "",
    direccion: "",
    nombre: "",
    pertenencia: null,
    nombrePertenece: "",
    areaPredioSolicitud: 0,
    tieneConflictos: null,
    conflictos: ""
}

export const usePredio = () => {

    const [ predio, dispatch ] = useReducer(predioReducer, initialPredio);

    const handlerPredio = (pred) => {
        dispatch({
            type: 'setPredio',
            payload: pred,
        });
    }

    const handleResetPredio = () =>{
        dispatch({
            type: 'reset'
        });
    }

    return {
        predio,
        handlerPredio,
        handleResetPredio,
    };

}