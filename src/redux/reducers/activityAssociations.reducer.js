const activityAssociationsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ACT_ASSOC' :
            return action.payload;
        case 'CLEAR_ACT_ASSOC' :
            return {};
        default :
            return state;
    }
}

export default activityAssociationsReducer;