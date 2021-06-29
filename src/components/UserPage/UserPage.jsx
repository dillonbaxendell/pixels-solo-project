import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//Buttons
import NextButton from "../NextButton/NextButton";

function UserPage() {
  const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);


  return (
    <div className="container">
      <h2>Welcome, {user.first_name}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <div>
        <h4>An affirmation message will go here.</h4>
      </div>
      {/* <LogOutButton className="btn" /> */}
      <NextButton  page="/reflection/1"/>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
