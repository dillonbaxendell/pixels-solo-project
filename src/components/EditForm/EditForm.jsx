import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import relationshipListReducer from "../../redux/reducers/relationshipList.reducer";

function EditForm() {
    const dispatch = useDispatch();


  const reflection = useSelector((store) => store.editReflectionReducer);
  const activitiesList = useSelector((store) => store.activityList);
  const wordList = useSelector((store) => store.wordList);
  const relationshipList = useSelector((store) => store.relationshipList);
  console.log('word list is:', wordList);
  console.log('activity list is:', activitiesList)
  console.log('relationship list is:', relationshipList);
  console.log("reflection is:", reflection);

  //State variables
  const [editActivityID, setActivityID] = useState(reflection.activity_id);
  console.log('activity ', editActivityID);
  const [editMood, setMood] = useState(1);
  const [editWordID, setWordID] = useState(reflection.word_id);
  const [editRelationID, setRelationID] = useState(reflection.relationship_id);

  const reflectionToEdit = {
      activity_id: editActivityID,
      id: reflection.id,
      mood: editMood,
      relationship_id: editRelationID,
      word_id: editWordID
  }

  console.log('REFLECTION TO EDIT: ', reflectionToEdit);

  const handleSubmit = () => {
      console.log('clicked submit');

      dispatch({ type: 'EDIT_REFLECTION', payload: reflectionToEdit })

      //Clear Redux
      dispatch({ type: 'CLEAR_EDIT' })
  }

  return (
    <>
      <div>
        <label htmlFor="mood">
          Mood:
          <select
            name="mood"
            value={editMood}
            placeholder={reflection.mood}
            onChange={(event) => setMood(event.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="activity">
          Activity:
          <select
            name="activity"
            placeholder={reflection.activity_name}
            value={editActivityID}
            onChange={(event) => setActivityID(event.target.value)}
          >
              {activitiesList.map((activity) => {
                  return <option value={activity.id} key={activity.id}>{activity.activity_name}</option>
              })}
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="word">
          Word Association:
          <select
            name="word"
            placeholder={reflection.word_name}
            value={editWordID}
            onChange={(event) => setWordID(event.target.value)}
          >
              {wordList.map((word) => {
                  return <option value={word.id} key={word.id}>{word.word_name}</option>
              })}
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="relationship">
          Relationship:
          <select
            name="relationship"
            placeholder={reflection.name}
            value={editRelationID}
            onChange={(event) => setRelationID(event.target.value)}
          >
              {relationshipList.map((relation) => {
                  return <option value={relation.id} key={relation.id}>{relation.name} - {relation.relationship_to_user}</option>
              })}
          </select>
        </label>
      </div>
      <button onClick={handleSubmit}>SUBMIT</button>
    </>
  );
}

export default EditForm;
