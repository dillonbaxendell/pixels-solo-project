import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//WORKER SAGA: will be fired on 'FETCH_ACTIVITIES"
function* fetchActivities() {
    try {

        //GET request to grab the activities list
        const response = yield axios.get('/api/activity');

        //Set the activities list in Redux
        yield put({ type: 'SET_ACTIVITIES', payload: response.data});
    } catch (error) {
        console.log('Activities get request failed', error);
    }
}

//WORKER SAGA: will be fired on 'ADD_ACTIVITY'
function* postActivity(action) {
    try {
        let newActivity = action.payload;
        console.log('newActivity is:', newActivity);
        //POST request to add new activity
        yield axios.post('/api/activity', {activity_name: newActivity});

        yield put({ type: 'FETCH_ACTIVITIES' });
    } catch (error) {
        console.log('Activity POST request failed', error);
    }
}


function* activitiesListSaga() {
    yield takeLatest('FETCH_ACTIVITIES', fetchActivities);
    yield takeLatest('ADD_ACTIVITY', postActivity);
}

export default activitiesListSaga;