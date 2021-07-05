import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import StarIcon from '@material-ui/icons/Star';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FlareIcon from '@material-ui/icons/Flare';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import mood1 from "../../Images/MOOD1.JPEG"
import mood2 from "../../Images/MOOD2.JPEG";
import mood3 from "../../Images/MOOD3.JPEG";
import mood4 from "../../Images/MOOD4.JPEG";
import mood5 from "../../Images/MOOD5.JPEG";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    // margin: 'auto',
    maxWidth: 700,
    minWidth: 225,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
    border: 'black solid 1px'
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ReflectionItem({reflection}) {
  const classes = useStyles();

  const checkMood = (moodValue) => {
    switch(moodValue) {
      case 1:
        return mood1;
      case 2:
        return mood2;
      case 3:
        return mood3;
      case 4:
        return mood4;
      case 5:
        return mood5;
      default:
        return
    }
  }

  return (
    <div className={classes.root}>
        <Grid container spacing={2} alignItems="center">
        <Paper >
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="mood" src={checkMood(reflection.mood)}/>
            </ButtonBase>
          </Grid>
          </Paper>
          <Paper className={classes.paper}>
          <Grid item xs={12} sm container alignItems="center">
            <Grid item xs container direction="column">
              <Grid item xs>
              <ListItem button key="Activities">
              <ListItemIcon>
                  <DirectionsRunIcon />
                  <ListItemText primary={reflection.activity_name} />
              </ListItemIcon>
              </ListItem>

              <ListItem button key="Words">
              <ListItemIcon>
                  <FavoriteIcon />
                  <ListItemText primary={reflection.word_name} />
              </ListItemIcon>
              </ListItem>

              <ListItem button key="Relationships">
              <ListItemIcon>
                  <PeopleAltIcon />
                <ListItemText primary={reflection.name} />
              </ListItemIcon>
              </ListItem>
              
              </Grid>

            </Grid>
          </Grid>
          </Paper>
        </Grid>
    </div>
  );
}