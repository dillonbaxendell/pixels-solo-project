import activityAssociationsReducer from "./activityAssociations.reducer";


describe('ACTIVITY ASSOCIATIONS REDUCER TESTS', () => {

    test('SET_ACT_ASSOC', () => {
        const action = {
            type: 'SET_ACT_ASSOC',
            payload: {
                id: 1,
                word_name: 'something'
            }
        }
        const state = {};

        expect(activityAssociationsReducer(state, action)).toEqual({id: 1, word_name: 'something'})
    })

    test('CLEAR_ACT_ASSOC', () => {
        const action = {
            type: 'CLEAR_ACT_ASSOC',
        }

        const state = {id: 1, word_name: 'something'};

        expect(activityAssociationsReducer(state, action)).toEqual({})
    })

})