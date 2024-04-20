

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

export const predioReducer = (state = {}, action) => {
    switch (action.type) {
        case 'setPredio':
            return {
                ...state,
                idPredio: action.payload.idPredio,
                numPredialAnti: action.payload.numPredialAnti,
                nupre: action.payload.nupre,
                idMunicipio: action.payload.idMunicipio,
                numPredialNal: action.payload.numPredialNal,
                numFolio: action.payload.numFolio,
                vereda: action.payload.vereda,
                corregimiento: action.payload.corregimiento,
                centroPoblado: action.payload.centroPoblado,
                direccion: action.payload.direccion,
                nombre: action.payload.nombre,
                pertenencia: action.payload.pertenencia,
                nombrePertenece: action.payload.nombrePertenece,
                areaPredioSolicitud: action.payload.areaPredioSolicitud,
                tieneConflictos: action.payload.tieneConflictos,
                conflictos: action.payload.conflictos
            };
        case 'reset':
            return initialPredio;
        default:
            return state;
    }
}