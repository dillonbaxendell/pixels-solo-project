const moodValueReducer = (state = 1, action) => {
    switch (action.type) {
        case 'SET_MOOD' :
            return action.payload;
        default :
            return state;
    }
}

// user will be on the redux state at:
// state.user
export default moodValueReducer;