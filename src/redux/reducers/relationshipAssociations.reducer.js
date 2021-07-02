const relationshipAssociationsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_RELATION_ASSOC' :
            return action.payload;
        case 'CLEAR_RELATION_ASSOC' :
            return {};
        default :
            return state;
    }
}

export default relationshipAssociationsReducer;