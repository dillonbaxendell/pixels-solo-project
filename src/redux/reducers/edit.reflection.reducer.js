const editReflectionReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EDIT' :
            return action.payload;
        default :
            return state;
    }
}

export default editReflectionReducer;