//Buttons
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function NextButton({page}) {
    const classes = useStyles();
    const history = useHistory();

      //Takes us to the start of the MoodForm
  const handleNextPage = (page) => {
    console.log("clicked Next");

    history.push(page);
  };

  return (
    <>
      <div className={classes.root}>
        <IconButton onClick={() => handleNextPage(page)}>
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
      </div>
    </>
  );
}

export default NextButton;
