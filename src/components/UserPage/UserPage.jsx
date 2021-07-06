import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import './UserPage.css';

//Buttons
import NextButton from "../NextButton/NextButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

function UserPage() {
  const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  const [inputOne, setInputOne] = useState(
    "Your worth is not measure by your productivity"
  );
  console.log("input1: ", inputOne);
  const [inputTwo, setInputTwo] = useState(
    "You should celebrate the tiny victories"
  );
  const [inputThree, setInputThree] = useState("Your potential is endless");

  let isEditable = false;

  const handleClick = () => {
    isEditable = true;
  };

  return (
    <div className="container">
      <h2>Welcome, {user.first_name}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <div>
        <Typography className="inputOne" variant="h3">
          Your worth is not measured by your productivity
        </Typography>
      </div>
      <div>
        <Typography className="inputTwo" variant="h3">
          You should celebrate the tiny victories
        </Typography>
      </div>
      <div>
        <Typography className="inputThree" variant="h3">Your potential is endless</Typography>
      </div>
      <div className="nextBtn">
      {/* <LogOutButton className="btn" /> */}
      <NextButton pageRoute="/reflection/1" />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
