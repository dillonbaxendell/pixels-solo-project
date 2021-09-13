import editReflectionReducer from "../../src/redux/reducers/edit.reflection.reducer";


describe('EDIT REFLECTION REDUCER TESTS', () => {

    test('SET_EDIT', () => {
        const action = {
            type: 'SET_EDIT',
            payload: {
                id: 1
            }
        }
        const state = {};

        expect(editReflectionReducer(state, action)).toEqual({id: 1})
    })

    test('UNSET_USER', () => {
        const action = {
            type: 'CLEAR_EDIT',
        }

        const state = {id: 1};

        expect(editReflectionReducer(state, action)).toEqual({})
    })

})