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

function* activitiesListSaga() {
    yield takeLatest('FETCH_ACTIVITIES', fetchActivities);
}

export default activitiesListSaga;