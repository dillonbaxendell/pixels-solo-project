import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//WORKER SAGA: will be fired on 'SUBMIT_REFLECTION'
function* postReflection(action) {
  try {
    let masterObject = action.payload;
    console.log("masterObject in postReflection:", masterObject);

    //POST request to add new Reflection
    yield axios.post("/api/reflection", masterObject);
  } catch (error) {
    console.log("Reflection POST request failed", error);
  }
}

//WORKER SAGA: fired on 'FETCH_TODAY' & 'FETCH_YESTERDAY'
//This grabs the reflections for today and yesterday to display in Daily Overview
function* fetchReflections(action) {
  try {
    let targetDate = action.payload.targetDate;
    let userID = action.payload.user_id;
    console.log("targetDate in saga:", targetDate);
    //GET request to grab today's reflections
    const response = yield axios.post("/api/reflection/overview", {
      targetDate: targetDate,
      user_id: userID
    });

    //Set the today list in Redux
    //IF the we're grabbing yesterday's reflection, then we want to send 
    //that to a different reducer. If not, send to the today reducer.
    console.log('response.data is:', response.data);
    if (targetDate === "yesterday") {
      yield put({ type: "SET_YESTERDAY", payload: response.data });
    } else {
      yield put({ type: "SET_TODAY", payload: response.data });
    }

  } catch (error) {
    console.log("Today GET request failed", error);
  }
}

function* editReflection(action) {
    try {
        let reflectionToEdit = action.payload;
        let reflectionID = action.payload.id 
        console.log('reflectionID is:', reflectionID);

        yield axios.put(`/api/reflection/${reflectionID}`, reflectionToEdit);

    } catch (error) {
        console.log('Reflection PUT request failed', error);
    }
}

function* reflectionSaga() {
  yield takeLatest("SUBMIT_REFLECTION", postReflection);
  yield takeLatest("FETCH_TODAY", fetchReflections);
  yield takeLatest("FETCH_YESTERDAY", fetchReflections);
  yield takeLatest("EDIT_REFLECTION", editReflection);
}

export default reflectionSaga;
