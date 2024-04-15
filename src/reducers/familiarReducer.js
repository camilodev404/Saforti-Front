export const familiarReducer = (state = [], action) => {

    switch (action.type) {
        case 'familiares':
            if (state!== null){
                return [ ...state, action.payload ];
            } else {
                return [action.payload];
            }
        case 'remove':
            const newState = state.filter(user => user.idFamiliar !== action.payload);
            return newState;
        case 'replace':
            return [ action.payload ];
        default:
            return state;
    }

}