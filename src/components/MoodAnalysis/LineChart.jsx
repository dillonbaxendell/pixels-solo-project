import React from 'react';
import {Line, Doughnut} from 'react-chartjs-2';
import { useState, useEffect } from "react";




export default function ChartJS({moodData}) {

    useEffect(() => {
       getFields(moodData)
      }, []);


      let output = [];

      const getFields = (data) => {

        for (let i = 0; i < data.length; i++) {
            output.push(Number(data[i].mood))
            
        }

        console.log('today output is:', output);
      }

      console.log(moodData);
    
    const state = {

        datasets: [
          {
            backgroundColor: [
              '#B21F00',
              '#C9DE00',
              '#2FDE00',
              '#00A6B4',
              '#6800B4'
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F'
            ],
            data: output
          }
        ]
      } 

    


    return (
      <div>

        <Line
          data={{
              labels: ['Mood'],
              datasets: [
                  {
                      label: 'your mood today',
                      data: moodData,
                      backgroundColor: 'white',
                      borderColor: '#2a994d',
                      tension: 0.2,
                  }],
                labels: ['', '', '', '', '', '', '', '', '', ''                  ]
                }}
          options={{
            parsing:{
                xAxisKey: 'id',
                yAxisKey: 'mood'
            },
            scales: {
                yAxis: {
                    min: 1,
                    max: 5,
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                    }
                },
                // xAxis: {
                //     grid: {
                //         color: 'red'
                //     }
                // }
            },
          }}
        />
      </div>
    );
  }