import wordAssociationsReducer from "./wordAssociations.reducer";

describe('WORD ASSOCIATIONS REDUCER TESTS', () => {

    test('SET_ASSOCIATIONS', () => {
        const action = {
            type: 'SET_ASSOCIATIONS',
            payload: {
                id: 1
            }
        }
        const state = {};

        expect(wordAssociationsReducer(state, action)).toEqual({id: 1})
    })

    test('CLEAR_WORD_ASSOC', () => {
        const action = {
            type: 'CLEAR_WORD_ASSOC',
        }

        const state = {id: 1};

        expect(wordAssociationsReducer(state, action)).toEqual({})
    })

})