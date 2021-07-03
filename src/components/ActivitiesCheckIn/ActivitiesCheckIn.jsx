import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SubmitButton from "../SubmitButton/SubmitButton";
import PreviousButton from "../PreviousButton/PreviousButton";
import ActivityModal from "../ActivityModal/ActivityModal";
import RelationshipModal from "../RelationshipModal/RelationshipModal";

function ActivitiesCheckIn() {
  const dispatch = useDispatch();
  const history = useHistory();

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


    history.push('/daily');
  }

  return (
    <>
      <div id="activities-check-in">
        <div>
        <img src={moodValue.img} width="100px" height="100px"/>
        </div>
        <div>
          <h2>What Activities Were You Up To?</h2>
        </div>
        <div>
          <h4>what you were doing</h4>
            {activityList.map((activity) => {
              return (
                <div
                  onClick={() =>
                    selectActivity({
                      id: activity.id,
                      activity_name: activity.activity_name,
                    })
                  }
                  key={activity.id}
                >
                  <p>{activity.activity_name}</p>
                </div>
              );
            })}
          <ActivityModal />
        </div>
        <div>
          <h4>who you were with</h4>
            {relationshipList.map((relationship) => {
              return (
                <div
                  onClick={() =>
                    selectRelationship({
                      id: relationship.id,
                      name: relationship.name,
                      relationship_to_user: relationship.relationship_to_user,
                    })
                  }
                  key={relationship.id}
                >
                  <p>{relationship.name}</p>
                </div>
              );
            })}
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
