const moodValueReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MOOD' :
            return action.payload;
        case 'CLEAR_MOOD' :
            return {};
        default :
            return state;
    }
}

// user will be on the redux state at:
// state.user
export default moodValueReducer;