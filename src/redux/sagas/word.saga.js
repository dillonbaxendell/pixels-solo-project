import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//WORKER SAGA: will be fired on 'FETCH_WORDS'
function* fetchWords() {

}








function* wordSaga() {
    yield takeLatest('FETCH_WORDS', fetchWords);
  }


export default wordSaga;