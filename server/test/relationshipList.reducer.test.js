import relationshipListReducer from "../../src/redux/reducers/relationshipList.reducer";


describe('RELATIONSHIP LIST REDUCER TESTS', () => {

    test('SET_RELATIONSHIPS', () => {
        const action = {
            type: 'SET_RELATIONSHIPS',
            payload: {
                id: 1
            }
        }
        const state = {};

        expect(relationshipListReducer(state, action)).toEqual({id: 1})
        
    })


})