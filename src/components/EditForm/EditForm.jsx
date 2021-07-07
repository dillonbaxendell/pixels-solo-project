import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import mood1 from "../../Images/MOOD1.JPEG"
import mood2 from "../../Images/MOOD2.JPEG";
import mood3 from "../../Images/MOOD3.JPEG";
import mood4 from "../../Images/MOOD4.JPEG";
import mood5 from "../../Images/MOOD5.JPEG";
import { Grid, Typography, Paper } from "@material-ui/core";
import './EditForm.css';
import EditWordItem from './EditWordItem';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "right",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));


function EditForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();


    const moodIcons = [
      { value: 5, img: mood5 },
      { value: 4, img: mood4 },
      { value: 3, img: mood3 },
      { value: 2, img: mood2 },
      { value: 1, img: mood1 },
    ];


  const reflection = useSelector((store) => store.editReflectionReducer);
  const activitiesList = useSelector((store) => store.activityList);
  const wordList = useSelector((store) => store.wordList);
  const relationshipList = useSelector((store) => store.relationshipList);
  console.log(wordList);

  //State variables
  const [editActivity, setActivity] = useState({id: reflection.activity_id, activity_name: reflection.activity_name});
  const [editMood, setMood] = useState(1);
  const [editWord, setWord] = useState({id: reflection.word_id, word_name: reflection.word_name});
  const [editRelationID, setRelationID] = useState(reflection.relationship_id);
  
  const reflectionToSend = {
      activity_id: editActivity.id,
      id: reflection.id,
      mood: editMood,
      relationship_id: editRelationID,
      word_id: editWord.id
  }

  console.log('REFLECTION TO EDIT: ', reflectionToSend);

  const handleSubmit = () => {
      console.log('clicked submit');

      dispatch({ type: 'EDIT_REFLECTION', payload: reflectionToSend })

      history.push('/daily');
  }

  useEffect(() => {
      dispatch({ type: 'FETCH_WORDS' })
      dispatch({ type: 'FETCH_RELATIONSHIPS' })
      dispatch({ type: 'FETCH_ACTIVITIES' })
  }, [])


  const handleSelect = (wordObject) => {

    //Sets the word associations in Redux so we can access it later
    dispatch({
      type: "SET_ASSOCIATIONS",
      payload: wordObject,
    });
  };

  return (
    <>
      <div>
        <div>
          <h3>Mood</h3>
        </div>
          <div>
            {moodIcons.map((mood) => {
              return (
                <div>
                  <img
                    key={mood.value}
                    value={mood.value}
                    src={mood.img}
                    width="100px"
                    height="100px"
                    className="img"
                    onClick={(event) => setMood(event.target.value)}
                  />
                </div>
              )
            })}
          </div>
      </div>
      <div>
        <h3>Word Association</h3>
      </div>
      <div>
      <Paper component="ul" className={classes.root}>
          {wordList.map((word) => {
            return (
              <EditWordItem word={word} key={word.id} classes={classes} setWord={setWord} editWord={editWord} handleSelect={handleSelect}/>
            );
          })}
        </Paper>
      </div>
      <div>
        <h3>Activity</h3>
      </div>
      <div>
      <Paper component="ul" className={classes.root}>
          {activitiesList.map((activity) => {
            return (
              <EditActivityItem activity={activity} key={activity.id} classes={classes} setWord={setWord} editWord={editWord} handleSelect={handleSelect}/>
            );
          })}
        </Paper>
      </div>


      {/* <div>
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
      </div> */}
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
