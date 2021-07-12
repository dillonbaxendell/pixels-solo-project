//Imports:
//React
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//Mood images
import mood1 from "../../Images/MOOD1.JPEG"
import mood2 from "../../Images/MOOD2.JPEG";
import mood3 from "../../Images/MOOD3.JPEG";
import mood4 from "../../Images/MOOD4.JPEG";
import mood5 from "../../Images/MOOD5.JPEG";
//Child components
import EditWordItem from './EditWordItem';
import EditActivityItem from './EditActivityItem';
import EditRelationItem from './EditRelationItem';
//Styling
import './EditForm.css';
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, Container, Typography } from "@material-ui/core";

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

    //The Mood Icons list so we can map through it
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
  const [editMood, setMood] = useState(reflection.mood);
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

          //Wait a little bit so the dispatch finishes before going to the next page
    const timer = setTimeout(() => {
      history.push("/daily");
    }, 1000);
  }

  const handleClick = (mood) => {

    setMood(mood.value);
  }

  

  return (
    <Container>
      <div>
        <div>
          <Typography variant="h5">Mood</Typography>
        </div>
          <ul className="mood">
            {moodIcons.map((mood) => {
              console.log(mood.value)
              return (
                <li
                value={mood.value}
                >
                  <img
                    className={ editMood === mood.value ? 'primary' : 'default'}
                    key={mood.value}
                    src={mood.img}
                    width="50px"
                    height="50px"
                    onClick={() => handleClick(mood)}
                  />
                </li>
              )
            })}
          </ul>
      </div>
      <div className="header" >
        <Typography variant="h5">Word Association</Typography>
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
      <div className="header">
        <Typography variant="h5">Activity</Typography>
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
      <div className="header">
        <Typography variant="h5">Relationship</Typography>
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
      <div className="submit" >
      <Button variant="contained" color="primary" onClick={handleSubmit}>SUBMIT</Button>
      </div>
    </Container>
  );
}

//Export this component
export default EditForm;
