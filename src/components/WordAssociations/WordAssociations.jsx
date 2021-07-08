import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NextButton from "../NextButton/NextButton";
import PreviousButton from "../PreviousButton/PreviousButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./WordAssociations.css";
import WordItem from "../WordItem/WordItem";
import Container from "@material-ui/core/Container";
import swal from 'sweetalert';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "right",
    flexWrap: "wrap",
    listStyle: "none",
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

    if (word === '') {
      swal('Oops, it looks like there is no word to add');
    } else {
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
    }
  };

  const handleSelect = (wordObject) => {

    //Sets the word associations in Redux so we can access it later
    dispatch({
      type: "SET_ASSOCIATIONS",
      payload: wordObject,
    });
  };

  console.log()



  return (
    <Container>
      <div id="word-associations">
        <div id="mood">
          <img src={moodValue.img} width="150px" height="150px" />
        </div>
        <div id="header">
          <Typography variant="h4">Word Associations</Typography>
        </div>
        <div id="form">
          <TextField
            placeholder="Add a word"
            value={word}
            onChange={(event) => {
              setWord(event.target.value);
            }}
          />
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleAddWord}
          >
            Word
          </Button>
        </div>
        <Paper component="ul" className={classes.root}>
          {wordList.map((word, i) => {
            return (
              <WordItem word={word} key={word.id} classes={classes} handleSelect={handleSelect}/>
            );
          })}
        </Paper>
      </div>
      <div>
        <PreviousButton />
        <NextButton pageRoute="/reflection/3" />
      </div>
    </Container>
  );
}

export default WordAssociations;
