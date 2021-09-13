import activityListReducer from "../../src/redux/reducers/activityList.reducer";


describe('ACTIVITY LIST REDUCER TESTS', () => {

    test('SET_ACTIVITIES', () => {
        const action = {
            type: 'SET_ACTIVITIES',
            payload: {id: 1, activity_name: 'something'}
        }
        const state = {};

        expect(activityListReducer(state, action)).toEqual({id: 1, activity_name: 'something'})
    })

})