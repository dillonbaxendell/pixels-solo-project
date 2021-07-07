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
import EditActivityItem from './EditActivityItem';
import EditRelationItem from './EditRelationItem';
import { makeStyles } from "@material-ui/core/styles";

//Styling for chip components
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

  
  //Grab reflection and lists from their Reducers:
  const reflection = useSelector((store) => store.editReflectionReducer);
  const activitiesList = useSelector((store) => store.activityList);
  const wordList = useSelector((store) => store.wordList);
  const relationshipList = useSelector((store) => store.relationshipList);


  //State variables to hold our edits
  const [editActivity, setActivity] = useState({id: reflection.activity_id, activity_name: reflection.activity_name});
  const [editMood, setMood] = useState(1);
  const [editWord, setWord] = useState({id: reflection.word_id, word_name: reflection.word_name});
  const [editRelation, setRelation] = useState({id: reflection.relationship_id, name: reflection.name});
  
  //On page load, run these things:
  useEffect(() => {
    //fetch the words for wordList
    dispatch({ type: 'FETCH_WORDS' })
    //fetch the activities for activitiesList
    dispatch({ type: 'FETCH_ACTIVITIES' })
    //fetch the relationships for relationshipList
    dispatch({ type: 'FETCH_RELATIONSHIPS' })
}, [])


  //This is the object we will send on submit to (in our PUT request)
  const reflectionToSend = {
      activity_id: editActivity.id,
      id: reflection.id,
      mood: editMood,
      relationship_id: editRelation.id,
      word_id: editWord.id
  }
  //Testing: what does our reflectionToSend look like?
  console.log('REFLECTION TO EDIT: ', reflectionToSend);

  
  //When we click submit, this will happen:
  //INITIATES PUT request
  const handleSubmit = () => {
      console.log('clicked submit');

      dispatch({ type: 'EDIT_REFLECTION', payload: reflectionToSend })

      history.push('/daily');
  }



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
              <EditWordItem word={word} key={word.id} classes={classes} setWord={setWord} editWord={editWord} />
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
              <EditActivityItem activity={activity} key={activity.id} classes={classes} setActivity={setActivity} editActivity={editActivity} />
            );
          })}
        </Paper>
      </div>
      <div>
        <h3>Relationship</h3>
      </div>
      <div>
      <Paper component="ul" className={classes.root}>
          {relationshipList.map((relation) => {
            return (
              <EditRelationItem relation={relation} key={relation.id} classes={classes} setRelation={setRelation} editRelation={editRelation} />
            );
          })}
        </Paper>
      </div>
      <button onClick={handleSubmit}>SUBMIT</button>
    </>
  );
}

export default EditForm;
