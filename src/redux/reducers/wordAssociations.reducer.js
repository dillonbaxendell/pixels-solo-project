const wordAssociationsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ASSOCIATIONS' :
            return [...state, action.payload];
        default :
            return state;
    }
}

export default wordAssociationsReducer;