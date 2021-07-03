const todayReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TODAY' :
            return action.payload;
        case 'CLEAR_TODAY' :
            return [];
        default :
            return state;
    }
}

export default todayReducer;