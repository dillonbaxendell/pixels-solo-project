import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import NextButton from '../NextButton/NextButton';
import PreviousButton from '../PreviousButton/PreviousButton';

function WordAssociations() {
    const dispatch = useDispatch();


    //Testing to see what the word associations are:
    const wordAssociations = useSelector( store => store.wordAssociations);
    //Grab MoodValue from Redux to display as reference for User
    const moodValue = useSelector( store => store.moodValue);
    //This sets the individual word, just in case there are multiple
    const [word, setWord] = useState('');

    console.log('the associated words are: ', wordAssociations);

    //Grabbing the whole wordList from Redux
    const wordList = useSelector( store => store.wordList);
    console.log('Word List is:', wordList);

    //On page load, do this:
    useEffect(() => {
        dispatch({type: 'FETCH_WORDS'})
    }, []);


    //Initiates a POST to add a word and also sets the word associations
    const handleAddWord = () => {
        //Adds the word to the database and wordList (initialize POST)
        dispatch({
            type: 'ADD_WORD',
            payload: word
        });

        //This sets the word associations for this reflection so we can grab it later
        dispatch({
            type: 'SET_ASSOCIATIONS',
            payload: word
        })

        //Clear input field
        setWord('');
    }

    const handleSelect = (wordObject) => {

        //Sets the word associations in Redux so we can access it later
        dispatch({
            type: 'SET_ASSOCIATIONS',
            payload: wordObject
        })
    }

  return (
    <>
      <div id="word-associations">
        <h2>{moodValue}</h2>

        <h2>Word Associations:</h2>

        <input type="text" placeholder="Add a word" value={word} onChange={(event) => {setWord(event.target.value)}}/>
        <button onClick={handleAddWord}>Add New Word</button>

        <ul>
          {wordList.map((word) => {
            return <li onClick={() => handleSelect({id: word.id, word_name: word.word_name})} key={word.id}>{word.word_name}</li>;
          })}
        </ul>
      </div>
      <div>
          <PreviousButton />
          <NextButton pageRoute="/reflection/3" />
      </div>
    </>
  );
}

export default WordAssociations;
