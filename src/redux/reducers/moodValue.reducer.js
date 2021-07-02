const moodValueReducer = (state = 1, action) => {
    switch (action.type) {
        case 'SET_MOOD' :
            return action.payload;
        case 'CLEAR_MOOD' :
            return 1;
        default :
            return state;
    }
}

// user will be on the redux state at:
// state.user
export default moodValueReducer;