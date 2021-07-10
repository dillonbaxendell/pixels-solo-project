import MoodChart from "./MoodChart";
import ChartJS from './ChartJS';
import LineChart from './LineChart';
import React, { useState, useEffect } from "react";
import axios from "axios";

function MoodAnalysis() {

  const [totalMoodData, setTotalMoodData] = useState([]);
  const [todayData, setTodayData] = useState([]);

  const getTotalData = () => {
    console.log("In getTotalData");

    //axios to get the count of the reflections
    axios.get(`/api/mood/total`)
    .then((response) => {
      //console log response
      console.log("Response from GET TOTAL DATA: ", response.data);

      setTotalMoodData(response.data);
    })
    .catch((err) => {
      console.log("Error in GET TOTAL DATA:", err);
    })
  };

  const getTodayData = () => {
    console.log("In getTodayData");

    //axios to get the moods of today
    axios.get(`/api/mood/today`)
    .then((response) => {
      //console log response
      console.log("Response from GET TODAY DATA:", response.data);

      setTodayData(response.data);
    })
    .catch((err) => {
      console.log("Error in GET TODAY DATA:", err);
    })
  };

  useEffect(() => {
    getTotalData();
    getTodayData();
  }, []);


  console.log('totalMoodData:', totalMoodData);
  console.log('todayData:', todayData);

  return (
    <>
      {/* <MoodChart moodData={totalMoodData}/> */}
      <LineChart moodData={todayData} />
      <ChartJS moodData={totalMoodData}/>
    </>
  );
}

export default MoodAnalysis;
