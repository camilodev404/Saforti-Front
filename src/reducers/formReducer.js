export const formReducer = (state = {}, action) => {

    switch (action.type) {
        case 'id':
            return {
                ...state,
                nroformulario: action.payload 
            };
        case 'deptos':
            return {
                ...state,
                departamentoForm: action.payload
            };
        case 'municipios':
            return {
                ...state,
                municipioForm: action.payload
            }
        default:
            return state;
    }

}