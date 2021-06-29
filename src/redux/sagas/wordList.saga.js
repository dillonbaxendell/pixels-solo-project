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

//WORKER SAGA: will be fired on 'ADD_WORD'
function* postWord(action) {
    try {
        let newWord = action.payload;
        console.log('action.payload:', action.payload)
        //POST request to add new word
        yield axios.post('/api/word', {word_name: newWord});
        
        yield put({ type: 'FETCH_WORDS' });
    } catch (error) {
        console.log('Word POST request failed', error);
    }
}



function* wordListSaga() {
    yield takeLatest('FETCH_WORDS', fetchWords);
    yield takeLatest('ADD_WORD', postWord);
  }


export default wordListSaga;