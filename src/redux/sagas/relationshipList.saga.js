import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//WORKER SAGA: will be fired on 'FETCH_RELATIONSHIPS'
function* fetchRelationships() {
    try {

        //GET request to grab the relationship list
        const response = yield axios.get('/api/relationship');

        //Set the relationship list in Redux
        yield put({ type: 'SET_RELATIONSHIPS', payload: response.data});
    } catch (error) {
        console.log('Relationship get request failed', error);
    }
}

function* relationshipListSaga() {
    yield takeLatest('FETCH_RELATIONSHIPS', fetchRelationships);
}

export default relationshipListSaga;