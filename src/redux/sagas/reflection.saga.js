import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//WORKER SAGA: will be fired on 'SUBMIT_REFLECTION'
function* postReflection(action) {
  try {
    let masterObject = action.payload;
    console.log("masterObject in postReflection:", masterObject);

    //POST request to add new Reflection
    yield axios.post("/api/reflection", masterObject);

    yield put({
        type: 'CLEAR_ACT_ASSOC'
    })

    yield put({
        type: 'CLEAR_WORD_ASSOC'
    })

    yield put({
        type: 'CLEAR_RELATION_ASSOC'
    })

    yield put({
        type: 'CLEAR_MOOD'
    })
  } catch (error) {
    console.log("Reflection POST request failed", error);
  }
}

// //WORKER SAGA: fired on 'FETCH_TODAY' & 'FETCH_YESTERDAY'
// //This grabs the reflections for today and yesterday to display in Daily Overview
// function* fetchReflections(action) {
//   try {
//     let targetDate = action.payload.targetDate;
//     let userID = action.payload.user_id;
//     console.log("targetDate in saga:", targetDate);
//     console.log('userID in saga:', userID);
//     //GET request to grab today's reflections
//     const response = yield axios.post("/api/reflection/overview", {
//       targetDate: targetDate,
//       user_id: userID
//     });

//     //Set the today list in Redux
//     //IF the we're grabbing yesterday's reflection, then we want to send 
//     //that to a different reducer. If not, send to the today reducer.
//     console.log('response.data is:', response.data);
//     if (targetDate === "yesterday") {
//       yield put({ type: "SET_YESTERDAY", payload: response.data });
//     } else {
//       yield put({ type: "SET_TODAY", payload: response.data });
//     }

//   } catch (error) {
//     console.log("Today GET request failed", error);
//   }
// }

function* editReflection(action) {
    try {
        let reflectionToEdit = action.payload;
        let reflectionID = action.payload.id 
        console.log('reflectionID is:', reflectionID);

        yield axios.put(`/api/reflection/${reflectionID}`, reflectionToEdit);

        yield put({  type: 'CLEAR_EDIT' })

    } catch (error) {
        console.log('Reflection PUT request failed', error);
    }
}


// function* deleteReflection(action) {
//     try {
//         let reflectionToDelete = action.payload;
//         let reflectionID = action.payload.id

//         yield axios.delete(`api/reflection/${reflectionID}`, reflectionToDelete);

//         yield put({ type: "FETCH_TODAY", payload: {user_id: userID, targetDate: 'today'}});
//     } catch (error) {
//         console.log('Reflection DELETE request failed', error);
//     }
// }

function* reflectionSaga() {
  yield takeLatest("SUBMIT_REFLECTION", postReflection);
  // yield takeLatest("FETCH_TODAY", fetchReflections);
  // yield takeLatest("FETCH_YESTERDAY", fetchReflections);
  yield takeLatest("EDIT_REFLECTION", editReflection);
  // yield takeLatest("DELETE_REFLECTION", deleteReflection);
}

export default reflectionSaga;
