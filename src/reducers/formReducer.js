export const formReducer = (state = {}, action) => {

    switch (action.type) {
        case 'id':
            console.log("asd",action.payload);
            return {
                nroformulario: action.payload 
            };
        default:
            return state;
    }

}