import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

function DailyOverview() {
  const dispatch = useDispatch();

  const todaysReflections = useSelector( store => store.todaysReflections);
  const yesterdaysReflections = useSelector( store => store.yesterdaysReflections);


  useEffect(() => {
    dispatch({type: 'FETCH_TODAY', payload: 'today'})
    dispatch({type: 'FETCH_YESTERDAY', payload: 'yesterday'})
  }, [])




  console.log('Todays Reflections are:', todaysReflections);
  console.log('Yesterdays Reflections are:', yesterdaysReflections);

  return (
    <>
      <h2>today's reflections:</h2>
    {todaysReflections.map( reflection => {
        return (
            <>
            <p>Mood Value is: {reflection.mood}</p>
            <p>Activity: {reflection.activity_name}</p>
            <p>feeling: {reflection.word_name}</p>
            </>
        )
    })}
          <h2>yesterday's reflections:</h2>
    {yesterdaysReflections.map( reflection => {
        return (
            <>
            <p>Mood Value is: {reflection.mood}</p>
            <p>Activity: {reflection.activity_name}</p>
            <p>feeling: {reflection.word_name}</p>
            </>
        )
    })}
    </>
  );
}

export default DailyOverview;
