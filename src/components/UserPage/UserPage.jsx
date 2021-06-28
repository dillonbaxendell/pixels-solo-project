import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
//Buttons
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function UserPage() {
  const classes = useStyles();
  const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  //Takes us to the start of the MoodForm
  const handleNextPage = () => {
    console.log('clicked Next');
    
    history.push('/reflection');
  }

  return (
    <div className="container">
      <h2>Welcome, {user.first_name}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <div>
        <h4>An affirmation message will go here.</h4>
      </div>
      {/* <LogOutButton className="btn" /> */}
      <div className={classes.root}>
      <IconButton >
        <ArrowForwardIosOutlinedIcon onClick={handleNextPage}/>
      </IconButton>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
