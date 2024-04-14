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
            };
        case 'autorizaciones':
            return {
                ...state,
                declaroverdad: action.payload.declaroverdad,
                autorizacion: action.payload.autorizacion,
                autconyuge: action.payload.autconyuge,
            };
        case 'verificaciones':
            return {
                ...state,
                haSidoBeneficiario: action.payload.haSidoBeneficiario,
                acreditaBeneficio: action.payload.acreditaBeneficio,
                idAcreditacion: action.payload.idAcreditacion,
                numResolucion: action.payload.numResolucion,
                fechaAcreditacion: action.payload.fechaAcreditacion,
            }
        case 'reset':
            return {
                nroformulario: null,
                departamentosForm: null,
                municipiosForm: null,
                fecha: null,
                tipoentrada: null,
                idbarrido: null,
                declaroverdad: null,
                autorizacion: null,
                autconyuge: null,
                idfuncionario: null,
            };
        default:
            return state;
    }

}