import React, { useState } from 'react';

function ReflectionForm() {
    const [moodValue, setMoodValue] = useState('');

    console.log('The moodValue is:', moodValue);



  return (
    <>
      <div>
        <h2>How are you doing today?</h2>

        <select value={moodValue} onChange={(event) => setMoodValue(event.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </>
  );
}

export default ReflectionForm;
