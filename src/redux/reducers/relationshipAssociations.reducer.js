const relationshipAssociationsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RELATION_ASSOC' :
            return [...state, action.payload];
        default :
            return state;
    }
}

export default relationshipAssociationsReducer;