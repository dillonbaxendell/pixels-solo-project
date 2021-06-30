import { all } from 'redux-saga/effects';
import activitiesListSaga from './activitiesList.saga';
import loginSaga from './login.saga';
import reflectionSaga from './reflection.saga';
import registrationSaga from './registration.saga';
import relationshipListSaga from './relationshipList.saga';
import userSaga from './user.saga';
import wordListSaga from './wordList.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    wordListSaga(),
    activitiesListSaga(),
    relationshipListSaga(),
    reflectionSaga(),
  ]);
}
