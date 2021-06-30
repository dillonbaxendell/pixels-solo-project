const activityAssociationsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACT_ASSOC' :
            return [...state, action.payload];
        default :
            return state;
    }
}

export default activityAssociationsReducer;