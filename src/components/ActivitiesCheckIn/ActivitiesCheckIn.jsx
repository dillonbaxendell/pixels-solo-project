import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import NextButton from '../NextButton/NextButton';
import PreviousButton from '../PreviousButton/PreviousButton';

function ActivitiesCheckIn() {
    //Grab MoodValue from Redux to display as reference for User
    const moodValue = useSelector( store => store.moodValue);


    return(
        <>
            <div id="activities-check-in">
                <div>
                <h2>{moodValue}</h2>
                </div>
                <div>
                <h2>What Activities Were You Up To?</h2>
                </div>
                <div>
                    <h4>what you were doing</h4>
                    <p>activity list goes here</p>
                </div>
                <div>
                    <h4>who you were with</h4>
                    <p>relationship list goes here</p>
                </div>
                <div>
                    <PreviousButton />
                    <NextButton pageRoute="/daily" />
                </div>


            </div>

        </>
    )
}

export default ActivitiesCheckIn;