import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Grid } from "@material-ui/core";
import ReflectionItem from "../ReflectionItem/ReflectionItem";
import DatePicker from "react-date-picker";

function DailyOverview() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [today, setToday] = useState([]);
  const [yesterday, setYesterday] = useState([]);
  const [date, setDate] = useState(new Date());

  const userID = useSelector((store) => store.user.id);


  console.log('date selected is: ', date);

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
    console.log("clicked delete!");

    //Axios Delete Request
    axios
      .delete(`api/reflection/${reflectionID}`)
      .then((response) => {
        console.log("Deleted reflection id#: ", reflectionID);
        //Update the today reflections list
        getToday();
        //refresh window to get most updated data
        window.location.reload();
      })
      .catch((err) => {
        console.log("error in DELETE handleDelete", err);
      });
  };

  //This grabs the reflections for today to display in Daily Overview
  //GET Today's Reflections
  const getToday = () => {
    console.log("In getToday");

    //axios to get feedback from database
    //send to Index.js for redux
    axios
      .get(`/api/reflection/today/${userID}`)
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
      <div>
        <DatePicker onChange={setDate} value={date} />
      </div>
      <h2>today</h2>
      {today.map((reflection) => {
        console.log(reflection);
        return (
          <div key={reflection.id}>
            <ReflectionItem reflection={reflection} />
            <button onClick={() => handleEdit(reflection)}>Edit</button>
            <button onClick={() => handleDelete(reflection.id)}>Delete</button>
          </div>
          // </Grid>
        );
      })}
      <h2>yesterday</h2>
      {yesterday.map((item) => {
        return (
          <div key={item.id}>
            <ReflectionItem reflection={item} />
          </div>
        );
      })}
    </>
  );
}

export default DailyOverview;
