import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

function EditForm() {
  const reflection = useSelector((store) => store.editReflectionReducer);
  console.log("reflection is:", reflection);

  //State variables
  const [editActivity, setActivity] = useState("");
  const [editMood, setMood] = useState(1);
  const [editWord, setWord] = useState("");
  const [editRelationName, setRelationName] = useState("");
  const [editRelationship, setRelationship] = useState("");

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
          <input
            type="text"
            name="activity"
            placeholder={reflection.activity_name}
            value={editActivity}
            onChange={(event) => setActivity(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="word">
          Word Association:
          <input
            type="text"
            name="word"
            placeholder={reflection.word_name}
            value={editWord}
            onChange={(event) => setWord(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="relationship-name">
          Relationship Name:
          <input
            type="text"
            name="relationship-name"
            placeholder={reflection.name}
            value={editRelationName}
            onChange={(event) => setRelationName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="relationship-category">
          Relation:
          <input
            type="text"
            name="relationship-category"
            placeholder={reflection.relationship_to_user}
            value={editRelationship}
            onChange={(event) => setRelationship(event.target.value)}
          />
        </label>
      </div>
    </>
  );
}

export default EditForm;
