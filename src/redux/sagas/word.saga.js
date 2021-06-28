import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//WORKER SAGA: will be fired on 'FETCH_WORDS'
function* fetchWords() {
    try {
        
        //GET request to grab the word list
        const response = yield axios.get('/api/word');

        //Set the word list in Redux
        yield put({ type: 'SET_WORDS', payload: response.data});
    } catch (error) {
        console.log('Word get request failed', error);
    }
}



function* wordSaga() {
    yield takeLatest('FETCH_WORDS', fetchWords);
  }


export default wordSaga;