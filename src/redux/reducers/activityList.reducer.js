const activityListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACTIVITIES' :
            return action.payload;
        default :
            return state;
    }
}

export default activityListReducer;