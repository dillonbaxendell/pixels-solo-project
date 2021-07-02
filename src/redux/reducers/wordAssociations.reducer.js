const wordAssociationsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ASSOCIATIONS' :
            return action.payload;
        case 'CLEAR_WORD_ASSOC' :
            return {};
        default :
            return state;
    }
}

export default wordAssociationsReducer;