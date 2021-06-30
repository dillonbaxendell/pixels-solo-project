import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


//WORKER SAGA: will be fired on 'SUBMIT_REFLECTION'
function* postReflection(action) {
    try {
        let masterObject = action.payload;
        console.log('masterObject in postReflection:', masterObject);

        //POST request to add new Reflection
        yield axios.post('/api/reflection', masterObject)

        
    } catch (error) {
        console.log('Reflection POST request failed', error);
    }
}

function* reflectionSaga() {
    yield takeLatest('SUBMIT_REFLECTION', postReflection);
}

export default reflectionSaga;