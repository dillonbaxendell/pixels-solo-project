//Buttons
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function PreviousButton({pageRoute}) {
    const classes = useStyles();
    const history = useHistory();

      //Takes us to the start of the MoodForm
  const handleNextPage = (pageRoute) => {
    console.log("clicked Next");

    history.goBack();
  };

  return (
    <>
      <div className={classes.root}>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBackIosOutlinedIcon />
        </IconButton>
      </div>
    </>
  );
}

export default PreviousButton;