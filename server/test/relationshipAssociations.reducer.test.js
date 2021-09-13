import relationshipAssociationsReducer from "../../src/redux/reducers/relationshipAssociations.reducer";

describe('USER REDUCER TESTS', () => {

    test('SET_RELATION_ASSOC', () => {
        const action = {
            type: 'SET_RELATION_ASSOC',
            payload: {
                id: 1
            }
        }
        const state = {};

        expect(relationshipAssociationsReducer(state, action)).toEqual({id: 1})
    })

    test('CLEAR_RELATION_ASSOC', () => {
        const action = {
            type: 'CLEAR_RELATION_ASSOC',
        }

        const state = {id: 1};

        expect(relationshipAssociationsReducer(state, action)).toEqual({})
        
    })

})