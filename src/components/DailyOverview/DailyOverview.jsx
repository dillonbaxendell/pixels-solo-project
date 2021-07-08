import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Grid, Button, Container, Typography } from "@material-ui/core";
import ReflectionItem from "../ReflectionItem/ReflectionItem";
import DatePicker from "react-date-picker";
import Paper from "@material-ui/core/paper";
import NewCheckInButton from "../NewCheckInButton/NewCheckInButton";
import './DailyOverview.css';

function DailyOverview() {
  const dispatch = useDispatch();
  const history = useHistory();

  // const [today, setToday] = useState([]);
  // const [yesterday, setYesterday] = useState([]);
  const [dateReflections, setDateReflections] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(true);
  const [renderDate, setRenderDate] = useState('')

  const userID = useSelector((store) => store.user.id);

  useEffect(() => {
    getDate();
    
  }, []);

  const handleEdit = (reflectionToEdit) => {
    console.log("clicked edit!", reflectionToEdit);

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

  const getDate = () => {
    console.log('In getDate');

    //axios to get the selected date's reflections
    axios.post(`/api/reflection/date/${userID}`, {date: date.toString().slice(0, 15)})
    .then((response) => {
      //console log response
      console.log("Response from GET date: ", response.data);

      setDateReflections(response.data);
    }) 
    .catch((err) => {
      console.log('Error in GET date reflections:', err);
    });

  } // end getDate

  //Calendar button to go to date selected
  const handleGoCalendar = () => {
  
    if(date.toString().slice(0, 15) === new Date().toString().slice(0, 15)) {
      console.log('the date is today!')
      setIsToday(true)
    } else {
      console.log('today is not the day')
      setIsToday(false)
    }
    
    setRenderDate(date.toString().slice(0, 15));
    getDate();
  }



  return (
    <Container>
      <div>
        <DatePicker onChange={setDate} value={date} />
        <Button className="datePicker" color="primary" variant="contained" onClick={handleGoCalendar}>GO</Button>
      </div>
      <div>
        <p>get an overview of your mood reflections throughout a day. Use the calendar tool above to select a date and click GO.</p>
      </div>
    {isToday ? <Typography variant="h4">today</Typography> : <Typography variant="h4">{renderDate}</Typography>}
      

      {dateReflections.map((reflection) => {
        return (
          <div key={reflection.id}>
            <ReflectionItem reflection={reflection} handleEdit={handleEdit} handleDelete={handleDelete}/>
          </div>
        );
      })}
          <NewCheckInButton />

    </Container>
    

  );
}

export default DailyOverview;
