const yesterdayReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_YESTERDAY' :
            return action.payload;
        case "CLEAR_YESTERDAY" :
            return [];
        default :
            return state;
    }
}

export default yesterdayReducer;