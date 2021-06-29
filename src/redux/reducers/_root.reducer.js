import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import wordList from './wordList.reducer';
import moodValue from './moodValue.reducer';
import wordAssociations from './wordAssociations.reducer';
import activityList from './activityList.reducer';
import relationshipList from './relationshipList.reducer';
import activityAssociations from './activityAssociations.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  wordList, // contains the word associations list
  moodValue, // sets the moodValue for the reflection
  wordAssociations, // contains the word associations for the reflection
  activityList, // contains the activities list
  relationshipList, // contains the relationship list of the User
  activityAssociations, // contains the activities associated with the reflection being made
});

export default rootReducer;
