export const formReducer = (state = {}, action) => {

    switch (action.type) {
        case 'formValues':
            return {
                ...state,
                departamentosForm: action.payload.departamentosForm,
                municipiosForm: action.payload.municipiosForm,
                fecha: action.payload.fecha,
                tipoentrada: action.payload.tipoentrada,
                idbarrido: action.payload.idbarrido,
            };
        case 'id':
            return {
                ...state,
                nroformulario: action.payload,
            }
        default:
            return state;
    }

}