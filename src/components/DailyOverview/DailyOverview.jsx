import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function DailyOverview() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [today, setToday] = useState([]);
  const [yesterday, setYesterday] = useState([]);

  const userID = useSelector((store) => store.user.id);

  useEffect(() => {
    getToday();
    getYesterday();
  }, []);

  const handleEdit = (reflectionToEdit) => {
    console.log("clicked edit!");

    //Save the reflectionToEdit in a reducer
    dispatch({ type: "SET_EDIT", payload: reflectionToEdit });

    //Go to EditForm
    history.push("/daily/edit");
  };

    //FUNCTION handleDelete
  const handleDelete = (reflectionID) => {
      console.log('clicked delete!');
      
      //Axios Delete Request
      axios.delete(`api/reflection/${reflectionID}`)
      .then( response => {
          console.log('Deleted reflection id#: ', reflectionID)
          //Update the today reflections list
          getToday();
          //refresh window to get most updated data
          window.location.reload();
      })
      .catch( err => {
          console.log('error in DELETE handleDelete', err);
      })
    };

  //This grabs the reflections for today to display in Daily Overview
  //GET Today's Reflections
  const getToday = () => {
    console.log("In getToday");

    //axios to get feedback from database
    //send to Index.js for redux
    axios.get(`/api/reflection/today/${userID}`)
      .then((response) => {
        //console log response
        console.log("Response from GET: ", response.data);

        //dispatch to redux
        setToday(response.data);
      })
      .catch((err) => {
        console.log("Error in GET: ", err);
      });
  }; // end getToday

  //This grabs the reflections for yesterday to display in Daily Overview
  //GET Yesterday's Reflections
  const getYesterday = () => {
    console.log("In getYesterday");

    //axios to get feedback from database
    //send to Index.js for redux
    axios
      .get(`/api/reflection/yesterday/${userID}`)
      .then((response) => {
        //console log response
        console.log("Response from GET yesterday: ", response.data);

        //dispatch to redux
        setYesterday(response.data);
      })
      .catch((err) => {
        console.log("Error in GET yesterday: ", err);
      });
  }; // end getYesterday

  return (
    <>
      <h2>today's reflections:</h2>
      {today.map((reflection) => {
        return (
          <div key={reflection.id}>
            <p>Mood Value is: {reflection.mood}</p>
            <p>Activity: {reflection.activity_name}</p>
            <p>feeling: {reflection.word_name}</p>
            <p>
              relationship: {reflection.name} -{" "}
              {reflection.relationship_to_user}
            </p>
            <button onClick={() => handleEdit(reflection)}>Edit</button>
            <button onClick={() => handleDelete(reflection.id)}>Delete</button>
          </div>
        );
      })}
      <h2>yesterday's reflections:</h2>
      {yesterday.map((item) => {
        return (
          <div key={item.id}>
            <p>Mood Value is: {item.mood}</p>
            <p>Activity: {item.activity_name}</p>
            <p>feeling: {item.word_name}</p>
            <p>
              relationship: {item.name} -{" "}
              {item.relationship_to_user}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default DailyOverview;
