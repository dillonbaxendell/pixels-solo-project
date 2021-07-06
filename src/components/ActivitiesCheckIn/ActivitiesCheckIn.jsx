import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SubmitButton from "../SubmitButton/SubmitButton";
import PreviousButton from "../PreviousButton/PreviousButton";
import ActivityModal from "../ActivityModal/ActivityModal";
import RelationshipModal from "../RelationshipModal/RelationshipModal";
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import '../WordAssociations/WordAssociations.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'right',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function ActivitiesCheckIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const user = useSelector( store => store.user)
  const wordAssociations = useSelector( store => store.wordAssociations);

  //TESTING to see what activity associations are:
  const activityAssociations = useSelector(
    (store) => store.activityAssociations
  );
  console.log("the associated activities are: ", activityAssociations);

  //TESTING to see what activity associations are:
  const relationshipAssociations = useSelector(
    (store) => store.relationshipAssociations
  );
  console.log("the associated relationships are: ", relationshipAssociations);

  //Grab MoodValue from Redux to display as reference for User
  const moodValue = useSelector((store) => store.moodValue);

  //Grab the whole Activity List from Redux
  const activityList = useSelector((store) => store.activityList);
  console.log("Activities list is:", activityList);

  //Grab the whole Relationship List from Redux
  const relationshipList = useSelector((store) => store.relationshipList);
  console.log("Relationship list is:", relationshipList);

  const masterObject = {
      user_id: user.id,
      mood: moodValue.value,
      word_assoc: wordAssociations,
      activity_assoc: activityAssociations,
      relation_assoc: relationshipAssociations
  }
  console.log('Master Object is:', masterObject);

  //On page load, do this:
  useEffect(() => {
    dispatch({ type: "FETCH_ACTIVITIES" });
    dispatch({ type: "FETCH_RELATIONSHIPS" });
  }, []);

  const selectActivity = (activityObject) => {
    //Sets the activity associations in Redux so we can access it later
    dispatch({
      type: "SET_ACT_ASSOC",
      payload: activityObject,
    });
  };

  const selectRelationship = (relationshipObject) => {
    //Sets the relationship associations in Redux so we can access it later
    dispatch({
      type: "SET_RELATION_ASSOC",
      payload: relationshipObject,
    });
  };


  const handleSubmit = () => {
      console.log('Clicked submit!');

    dispatch({
        type: 'SUBMIT_REFLECTION',
        payload: masterObject
    })

    const timer = setTimeout(() => {
      history.push('/daily')
    }, 1000);

   
  }

  return (
    <>
      <div id="activities-check-in">
        <div id="mood">
        <img src={moodValue.img} width="150px" height="150px"/>
        </div>
        <div id="header">
          <Typography variant="h4">What Activities Were You Up To?</Typography>
        </div>
        <div>
          <Typography variant="h6">what you were doing</Typography>
          <Paper component="ul" className={classes.root}>
            {activityList.map((activity) => {
              return (
                <li key={activity.id}>
                <Chip
                  label={activity.activity_name}
                  className={classes.chip}
                  onClick={() =>
                    selectActivity({
                      id: activity.id,
                      activity_name: activity.activity_name,
                    })
                  }
                >
                  </Chip>
                  </li>
              );
            })}
            </Paper>
          <ActivityModal />
        </div>
        <div>
          <Typography variant="h6">who you were with</Typography>
          <Paper component="ul" className={classes.root}>
            {relationshipList.map((relationship) => {
              return (
                <li key={relationship.id}>
                  <Chip
                  label={relationship.name}
                  className={classes.chip}
                  onClick={() =>
                    selectRelationship({
                      id: relationship.id,
                      name: relationship.name,
                      relationship_to_user: relationship.relationship_to_user,
                    })
                  }
                  >
                  </Chip>
                </li>
              );
            })}
            </Paper>
          <RelationshipModal />
        </div>
        <div>
          <PreviousButton />
        </div>
          <SubmitButton handleSubmit={handleSubmit}/>
      </div>
    </>
  );
}

export default ActivitiesCheckIn;
