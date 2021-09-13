import moodValueReducer from "../../src/redux/reducers/moodValue.reducer";


describe('MOOD VALUE REDUCER TESTS', () => {

    test('SET_MOOD', () => {
        const action = {
            type: 'SET_MOOD',
            payload: {
                moodValue: 1

            }
        }
        const state = {};

        expect(moodValueReducer(state, action)).toEqual({moodValue: 1})
    })

    test('CLEAR_MOOD', () => {
        const action = {
            type: 'CLEAR_MOOD',
        }

        const state = {moodValue: 1};

        expect(moodValueReducer(state, action)).toEqual({})
    })

})