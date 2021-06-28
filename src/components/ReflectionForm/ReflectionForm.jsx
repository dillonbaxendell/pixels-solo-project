import React, { useState } from "react";
//import Router from react-router-dom
import { Route, HashRouter as Router, useHistory } from "react-router-dom";

function ReflectionForm() {
  const [moodValue, setMoodValue] = useState("");

  console.log("The moodValue is:", moodValue);

  return (
    <>
      <form>
        <div id="mood-check-in">
          <h2>How are you doing today?</h2>

          <select
            value={moodValue}
            onChange={(event) => setMoodValue(event.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div id="word-associations">
            <h2>{moodValue}</h2>

            <h2>Word Associations:</h2>

            <input type="text" placeholder="Add a word" />
            <button>Add New Word</button>
        </div>
      </form>
    </>
  );
}

export default ReflectionForm;
