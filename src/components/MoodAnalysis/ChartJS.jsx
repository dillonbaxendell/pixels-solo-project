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

    console.log(getFields(moodData));
    
    const state = {
        labels: ['rad', 'happy', 'meh',
                 'bad', 'awful'],
        datasets: [
          {
            label: 'Mood',
            backgroundColor: [
              '#7cd384',
              '#9ce26e',
              '#fcd33b',
              '#ee8651',
              '#e9616d'
            ],
            hoverBackgroundColor: [
            '#2a994d',
            '#79be30',
            '#ec9f01',
            '#c95315',
            '#c42430'
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