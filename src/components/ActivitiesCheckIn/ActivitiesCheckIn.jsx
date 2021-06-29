import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NextButton from "../NextButton/NextButton";
import PreviousButton from "../PreviousButton/PreviousButton";

function ActivitiesCheckIn() {
  const dispatch = useDispatch();
  //Grab MoodValue from Redux to display as reference for User
  const moodValue = useSelector((store) => store.moodValue);
  //Grab the whole Activity List from Redux
  const activitiesList = useSelector((store) => store.activitiesList);
  console.log('Activities list is:', activitiesList);

  //On page load, do this:
  useEffect(() => {
    dispatch({ type: "FETCH_ACTIVITIES" });
  }, []);


  return (
    <>
      <div id="activities-check-in">
        <div>
          <h2>{moodValue}</h2>
        </div>
        <div>
          <h2>What Activities Were You Up To?</h2>
        </div>
        <div>
          <h4>what you were doing</h4>
          <ul>
              {activitiesList.map( activity => {
                  return <li key={activity.id}>{activity.activity_name}</li>
              })}
          </ul>
        </div>
        <div>
          <h4>who you were with</h4>
          <p>relationship list goes here</p>
        </div>
        <div>
          <PreviousButton />
          <NextButton pageRoute="/daily" />
        </div>
      </div>
    </>
  );
}

export default ActivitiesCheckIn;
