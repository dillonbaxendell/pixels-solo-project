import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chip from "@material-ui/core/Chip";


function WordItem ({word, classes, handleSelect}) {
    const selectedWord = useSelector(store => store.wordAssociations)

    const handleColorChange = () => {
        
        setIsSelected(!isSelected)
    }


    return (
        <>
              <li
                key={word.id}
                onClick={() => {
                  handleSelect({ id: word.id, word_name: word.word_name });
                }}
              >
                <Chip
                  color={ selectedWord.word_name === word.word_name ? 'primary' : 'default'}
                  label={word.word_name}
                  className={classes.chip}
                  onClick={(event) => handleColorChange(event)}
                ></Chip>
              </li>

        </>
    )
}

export default WordItem