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


//WORKER SAGA: will be fired on 'ADD_RELATIONSHIP'
function* postRelationship(action) {
    try {
        let newRelationship = action.payload;
        console.log('newRelationship is:', newRelationship);

        //POST request to add relationship
        yield axios.post('/api/relationship', newRelationship);

        yield put({ type: 'FETCH_RELATIONSHIPS' });
    } catch (error) {
        console.log('Relationship POST request failed', error);
    }
}


function* relationshipListSaga() {
    yield takeLatest('FETCH_RELATIONSHIPS', fetchRelationships);
    yield takeLatest('ADD_RELATIONSHIP', postRelationship);
}

export default relationshipListSaga;