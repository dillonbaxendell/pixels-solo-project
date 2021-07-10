import React from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';
import { useState, useEffect } from "react";




export default function ChartJS({moodData}) {

    useEffect(() => {
        getFields(moodData);
      }, []);

    let output = [];

    const getFields = (data) => {
 
    
        for (let i = 0; i < data.length; i++) {
            output.push(Number(data[i].count))     
        }
    
        console.log('output is:', output)
    }
    
    const state = {
        labels: ['rad', 'happy', 'meh',
                 'bad', 'awful'],
        datasets: [
          {
            label: 'Rainfall',
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

      
      console.log(output);


    return (
      <div>

        <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }