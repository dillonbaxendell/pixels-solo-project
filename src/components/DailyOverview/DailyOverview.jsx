import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

function DailyOverview() {
  const dispatch = useDispatch();

  const todaysReflections = useSelector( store => store.todaysReflections);



  useEffect(() => {
    dispatch({type: 'FETCH_TODAY'})
  }, [])




  console.log('Todays Reflections are:', todaysReflections);

  return (
    <>
      <h2>how does this look?</h2>

      <p>Mood Value:</p>
      <p>Word Associations:</p>

      <p>what you were doing</p>

      <p>who you were with</p>
    </>
  );
}

export default DailyOverview;
