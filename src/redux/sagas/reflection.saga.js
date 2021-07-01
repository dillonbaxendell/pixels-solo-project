import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


//WORKER SAGA: will be fired on 'SUBMIT_REFLECTION'
function* postReflection(action) {


    try {
        let masterObject = action.payload;
        console.log('masterObject in postReflection:', masterObject);

        //POST request to add new Reflection
        yield axios.post('/api/reflection', masterObject);
        
    } catch (error) {
        console.log('Reflection POST request failed', error);
    }
}

//WORKER SAGA: fired on 'FETCH_TODAY
//This grabs the reflections for today to display in Daily Overview
function* fetchToday() {
    try {
        //GET request to grab today's reflections
        const response = yield axios.get('/api/reflection');

        //Set the today list in Redux
        yield put({type: 'SET_TODAY', payload: response.data});
    } catch (error) {
        console.log('Today GET request failed', error);
    }
}

function* reflectionSaga() {
    yield takeLatest('SUBMIT_REFLECTION', postReflection);
    yield takeLatest('FETCH_TODAY', fetchToday);
}

export default reflectionSaga;