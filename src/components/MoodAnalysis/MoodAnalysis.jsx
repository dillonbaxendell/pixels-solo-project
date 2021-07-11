import ChartJS from "./ChartJS";
import LineChart from "./LineChart";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
//Mood images
import mood1 from "../../Images/MOOD1.JPEG";
import mood2 from "../../Images/MOOD2.JPEG";
import mood3 from "../../Images/MOOD3.JPEG";
import mood4 from "../../Images/MOOD4.JPEG";
import mood5 from "../../Images/MOOD5.JPEG";

function MoodAnalysis() {
  const [totalMoodData, setTotalMoodData] = useState([]);
  const [todayData, setTodayData] = useState([]);

  //Our Mood Icons in an array
  const moodIcons = [
    { value: 5, img: mood5 },
    { value: 4, img: mood4 },
    { value: 3, img: mood3 },
    { value: 2, img: mood2 },
    { value: 1, img: mood1 },
  ];

  //Grabs the data for the doughnut chart
  //Grabs all of the reflections ever made by the current user
  const getTotalData = () => {
    console.log("In getTotalData");

    //axios to get the count of the reflections
    axios
      .get(`/api/mood/total`)
      .then((response) => {
        //console log response
        console.log("Response from GET TOTAL DATA: ", response.data);

        setTotalMoodData(response.data);
      })
      .catch((err) => {
        console.log("Error in GET TOTAL DATA:", err);
      });
  };

  //Grabs the data for our line chart
  //Grabs all of the moods from the reflections made today by the current user
  const getTodayData = () => {
    console.log("In getTodayData");

    //axios to get the moods of today
    axios
      .get(`/api/mood/today`)
      .then((response) => {
        //console log response
        console.log("Response from GET TODAY DATA:", response.data);

        setTodayData(response.data);
      })
      .catch((err) => {
        console.log("Error in GET TODAY DATA:", err);
      });
  };

  //On page load, do this:
  useEffect(() => {
    getTotalData();
    getTodayData();
        // //Wait a little bit so the dispatch finishes before going to the next page
        // const timer = setTimeout(() => {
        //   getFields(totalMoodData);
        // }, 1000);
  }, []);

  //Calculates the sum for our total reflections made
  const calculateSum = (data) => {
    let sum = 0;

    //For every item in the array, add it to the sum total
    for (let i = 0; i < data.length; i++) {
      sum += Number(data[i].count);
    }
    return sum;
  };




    //FUNCTION: parses through the moodData array to get an array for the counts only
    const getFields = (data) => {
      let newArray = [];
      //for each array item, push the count into the output array
      for (let i = 0; i < data.length; i++) {
        newArray.push(Number(data[i].count));
      }
      return newArray;
    };

        //A holding place for the mood counts
        let output = getFields(totalMoodData);

  return (
    <Container>
      <Typography align="left" variant="h3">
        Mood Analysis
      </Typography>
      <div>
        <Typography variant="body1">
          <b>track how your mood has progressed today</b>
        </Typography>
        <LineChart moodData={todayData} />
      </div>
      <div>
        <ul class="mood">
          {moodIcons.map((mood) => {
            return (
              <li value={mood.value}>
                <img
                  key={mood.value}
                  src={mood.img}
                  width="50px"
                  height="50px"
                  className="img"
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <Typography variant="body1">
          <b>
            reflect on the trends of your mood throughout your whole Pixels
            lifetime
          </b>
        </Typography>

        <ChartJS moodData={output} />
      </div>
      <div style={{ marginTop: "60px" }}>
        <Typography align="center" variant="h5">
          Total Reflections Made: {calculateSum(totalMoodData)}
        </Typography>
      </div>
    </Container>
  );
}

export default MoodAnalysis;
