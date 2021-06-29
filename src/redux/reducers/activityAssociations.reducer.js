const activityAssociationsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACTIVITIES_ASSOCIATIONS' :
            return [...state, action.payload];
        default :
            return state;
    }
}

export default activityAssociationsReducer;