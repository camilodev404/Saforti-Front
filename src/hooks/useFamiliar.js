import { useReducer } from "react";
import { familiarReducer } from "../reducers/familiarReducer";

export const useFamiliar = () => {

    const [ familiares, dispatch ] = useReducer(familiarReducer, null);

    const handlerFamiliares = (familiare) => {
        dispatch({
            type: 'familiares',
            payload: familiare
        });
    }

    const handlerRemove = (id) => {
        dispatch({
            type: 'remove',
            payload: id
        });
    }

    const handlerReplace = (arr) => {
        dispatch({
            type: 'replace',
            payload: arr
        });
    }

    const handlerReset = () => {
        dispatch({
            type: 'reset',
        });
    }

    return {
        familiares,
        handlerFamiliares,
        handlerRemove,
        handlerReplace,
        handlerReset,
    }

}