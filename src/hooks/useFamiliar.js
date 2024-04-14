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

    return {
        familiares,
        handlerFamiliares,
        handlerRemove
    }

}