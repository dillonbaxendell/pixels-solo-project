const todayReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TODAY' :
            return action.payload;
        default :
            return state;
    }
}

export default todayReducer;