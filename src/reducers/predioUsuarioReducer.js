export const predioUsuarioReducer = (state = {}, action) => {
    switch (action.type) {
        case 'firstPredioUsuario':
            return {
                ...state,
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
                idPredio: action.payload.idPredio,
                cedula: action.payload.cedula,
                derechoSobrePredio: action.payload.derechoSobrePredio,
                tieneDatos: action.payload.tieneDatos,
                nombre: action.payload.nombre,
                ubicacion: action.payload.ubicacion,
                telefono: action.payload.telefono,
            }
        default:
            return state;
    }
}