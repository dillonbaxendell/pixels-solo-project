import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

function DailyOverview() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userID = useSelector( store => store.user.id)
  const todaysReflections = useSelector( store => store.todaysReflections);
  const yesterdaysReflections = useSelector( store => store.yesterdaysReflections);
  console.log('Todays Reflections are:', todaysReflections);
  console.log('Yesterdays Reflections are:', yesterdaysReflections);

  useEffect(() => {
    dispatch({type: 'FETCH_TODAY', payload: {user_id: userID, targetDate: 'today'}})
    dispatch({type: 'FETCH_YESTERDAY', payload: {user_id: userID, targetDate: 'yesterday'}})
  }, [])

const handleEdit = (reflectionToEdit) => {
    console.log('clicked edit!');

    //Save the reflectionToEdit in a reducer
    dispatch({ type: 'SET_EDIT', payload: reflectionToEdit });

    //Go to EditForm
    history.push('/daily/edit');

}

const handleDelete = () => {
    console.log('clicked delete!');
}


  return (
    <>
      <h2>today's reflections:</h2>
    {todaysReflections.map( reflection => {
        return (
            <>
            <p>Mood Value is: {reflection.mood}</p>
            <p>Activity: {reflection.activity_name}</p>
            <p>feeling: {reflection.word_name}</p>
            <p>relationship: {reflection.name} - {reflection.relationship_to_user}</p>
            <button onClick={() => handleEdit(reflection)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
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
