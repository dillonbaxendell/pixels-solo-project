import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NextButton from "../NextButton/NextButton";
import PreviousButton from "../PreviousButton/PreviousButton";
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './WordAssociations.css';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'right',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));


function WordAssociations() {
  const classes = useStyles();

  const dispatch = useDispatch();

  //Testing to see what the word associations are:
  const wordAssociations = useSelector((store) => store.wordAssociations);
  //Grab MoodValue from Redux to display as reference for User
  const moodValue = useSelector((store) => store.moodValue);
  //This sets the individual word, just in case there are multiple
  const [word, setWord] = useState("");

  console.log("the associated words are: ", wordAssociations);

  //Grabbing the whole wordList from Redux
  const wordList = useSelector((store) => store.wordList);
  console.log("Word List is:", wordList);

  //On page load, do this:
  useEffect(() => {
    dispatch({ type: "FETCH_WORDS" });
  }, []);

  //Initiates a POST to add a word and also sets the word associations
  const handleAddWord = () => {
    //Adds the word to the database and wordList (initialize POST)
    dispatch({
      type: "ADD_WORD",
      payload: word,
    });

    //This sets the word associations for this reflection so we can grab it later
    dispatch({
      type: "SET_ASSOCIATIONS",
      payload: word,
    });

    //Clear input field
    setWord("");
  };

  const handleSelect = (wordObject) => {
    //Sets the word associations in Redux so we can access it later
    dispatch({
      type: "SET_ASSOCIATIONS",
      payload: wordObject,
    });
  };

  return (
    <>
      <div id="word-associations">
        <div id="mood">
        <img src={moodValue.img} width="150px" height="150px" />
        </div>
        <div id="header">
        <Typography variant="h4">Word Associations</Typography>
        </div>
        <input
          type="text"
          placeholder="Add a word"
          value={word}
          onChange={(event) => {
            setWord(event.target.value);
          }}
        />
        <button onClick={handleAddWord}>Add New Word</button>
        <Paper component="ul" className={classes.root}>
        {wordList.map((word) => {
          return (
            <li key={word.id}>
            <Chip
              label={word.word_name}
              className={classes.chip}
              deleteIcon={<HighlightOffIcon />}
              onClick={() =>
                handleSelect({ id: word.id, word_name: word.word_name })
              }
            >
            </Chip>
            </li>
          );
        })}
        </Paper>
      </div>
      <div>
        <PreviousButton />
        <NextButton pageRoute="/reflection/3" />
      </div>
    </>
  );
}

export default WordAssociations;
