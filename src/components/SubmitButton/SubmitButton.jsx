//Buttons
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      float: 'right'
    },
  },
}));

function SubmitButton({handleSubmit}) {
    const classes = useStyles();


  return (
    <>
      <div className={classes.root}>
        <IconButton onClick={handleSubmit}>
          <Typography variant="button">Submit</Typography>
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
      </div>
    </>
  );
}

export default SubmitButton;