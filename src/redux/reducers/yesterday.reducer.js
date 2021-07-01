const yesterdayReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_YESTERDAY' :
            return action.payload;
        default :
            return state;
    }
}

export default yesterdayReducer;