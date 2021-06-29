import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

function WordAssociations() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [word, setWord] = useState('');
    console.log('the setWord is: ', word);

    const wordList = useSelector( store => store.word);
    console.log('Word List is:', wordList);

    useEffect(() => {
        dispatch({type: 'FETCH_WORDS'})
    }, []);

    const handleAddWord = () => {
        dispatch({
            type: 'ADD_WORD',
            payload: word
        });
    }

  return (
    <>
      <div id="word-associations">
        <h2>Mood value goes here</h2>

        <h2>Word Associations:</h2>

        <input type="text" placeholder="Add a word" value={word} onChange={(event) => {setWord(event.target.value)}}/>
        <button onClick={handleAddWord}>Add New Word</button>

        <ul>
          {wordList.map((word) => {
            return <li key={word.id}>{word.word_name}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default WordAssociations;
