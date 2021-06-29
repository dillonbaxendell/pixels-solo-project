import relationshipListSaga from "../sagas/relationshipList.saga";

const relationshipListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RELATIONSHIPS' :
            return action.payload;
        default :
            return state;
    }
}

export default relationshipListReducer;