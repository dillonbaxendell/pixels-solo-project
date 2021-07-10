import MoodChart from "./MoodChart";
import ChartJS from './ChartJS';
import LineChart from './LineChart';
import React, { useState, useEffect } from "react";
import axios from "axios";

function MoodAnalysis() {

  const [totalMoodData, setTotalMoodData] = useState([]);

  const getData = () => {
    console.log("In getData");

    //axios to get the count of the reflections
    axios.get(`/api/mood/total`)
    .then((response) => {
      //console log response
      console.log("Response from GET DATA: ", response.data);

      setTotalMoodData(response.data);
    })
    .catch((err) => {
      console.log("Error in GET DATA:", err);
    })
  };

  useEffect(() => {
    getData();
  }, []);


  console.log('totalMoodData:', totalMoodData);

  return (
    <>
      {/* <MoodChart moodData={totalMoodData}/> */}
      <LineChart moodData={totalMoodData} />
      <ChartJS moodData={totalMoodData}/>
    </>
  );
}

export default MoodAnalysis;
