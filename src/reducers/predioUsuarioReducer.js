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

export const predioUsuarioReducer = (state = {}, action) => {
    switch (action.type) {
        case 'firstPredioUsuario':
            return {
                ...state,
                id: {
                    idPredio: action.payload.id.idPredio,
                    cedula: action.payload.id.cedula,
                },
                legalizarJuridica: action.payload.legalizarJuridica,
                inicioTramite: action.payload.inicioTramite,
                entidad: action.payload.entidad,
                fechaSolicitud: action.payload.fechaSolicitud,
                numSolicitud: action.payload.numSolicitud,
                habitaExplota: action.payload.habitaExplota,
                fechaHabitaExplota: action.payload.fechaHabitaExplota,
                explotaciones: action.payload.explotaciones,
                explotanOtros: action.payload.explotanOtros,
                derechoExplotacion: action.payload.derechoExplotacion
            };
        case 'secondUpdate':
            return {
                ...state,
                id: {
                    idPredio: action.payload.id.idPredio,
                    cedula: action.payload.id.cedula,
                },
                derechoSobrePredio: action.payload.derechoSobrePredio,
                tieneDatos: action.payload.tieneDatos,
                nombre: action.payload.nombre,
                ubicacion: action.payload.ubicacion,
                telefono: action.payload.telefono,
            }
        case 'reset':
            return initialPredioUsuario;
        default:
            return state;
    }
}