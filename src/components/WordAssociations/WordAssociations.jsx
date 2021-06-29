import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import NextButton from '../NextButton/NextButton';
import PreviousButton from '../PreviousButton/PreviousButton';

function WordAssociations() {
    const dispatch = useDispatch();
    const history = useHistory();

    const wordAssociations = useSelector( store => store.wordAssociations);
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

    const handleSelect = (wordName) => {
        dispatch({
            type: 'SET_ASSOCIATIONS',
            payload: wordName
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
            return <li onClick={() => handleSelect(word.word_name)} key={word.id}>{word.word_name}</li>;
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
