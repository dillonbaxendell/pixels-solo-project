import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";

export default function ChartJS({ moodData }) {
  //On page load, do this:
  useEffect(() => {
    //get the new data fields by parsing through the moodData array
    getFields(moodData);
  }, []);

  //A holding place for the mood counts
  let output = [];

  //FUNCTION: parses through the moodData array to get an array for the counts only
  const getFields = (data) => {
    //for each array item, push the count into the output array
    for (let i = 0; i < data.length; i++) {
      output.push(Number(data[i].count));
    }

    console.log("output is:", output);
  };

  //state for the doughnut chart features
  const state = {
    datasets: [
      {
        label: "Mood",
        backgroundColor: [
          "#7cd384",
          "#9ce26e",
          "#fcd33b",
          "#ee8651",
          "#e9616d",
        ],
        hoverBackgroundColor: [
          "#2a994d",
          "#79be30",
          "#ec9f01",
          "#c95315",
          "#c42430",
        ],
        data: output,
      },
    ],
  };

  return (
    <div>
      <Doughnut
        data={state}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}
