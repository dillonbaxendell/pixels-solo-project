const wordListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_WORDS' :
            return action.payload;
        default :
            return state;
    }
}

// user will be on the redux state at:
// state.user
export default wordListReducer;