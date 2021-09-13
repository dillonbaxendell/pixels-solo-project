import wordListReducer from "../../src/redux/reducers/wordList.reducer";

describe('WORD LIST REDUCER TESTS', () => {

    test('SET_WORDS', () => {
        const action = {
            type: 'SET_WORDS',
            payload: {
                id: 1
            }
        }
        const state = {};

        expect(wordListReducer(state, action)).toEqual({id: 1})
    })


})