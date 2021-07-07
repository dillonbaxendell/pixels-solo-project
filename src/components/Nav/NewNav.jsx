import React from "react";
// import clsx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from '@material-ui/icons/Home';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import TodayIcon from '@material-ui/icons/Today';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch } from 'react-redux';



export default function Nav() {
//   const classes = useStyles();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();


  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }


  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <Link to={loginLinkData.path} style={{ color: 'black', textDecoration: 'none' }}>
        <ListItem button key="Home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={loginLinkData.text} />
        </ListItem>
    </Link>
      </List>
      <Divider />
      <Link to="/reflection/1" style={{ color: 'black', textDecoration: 'none' }}>
          <ListItem button key="CheckIn">
              <ListItemIcon>
                  <DoneOutlineIcon  />
              </ListItemIcon>
              <ListItemText primary="Check-In" />
          </ListItem>
        </Link>
      <Link to="/daily" style={{ color: 'black', textDecoration: 'none' }}>
          <ListItem button key="DailyOverview">
              <ListItemIcon>
                  <TodayIcon />
              </ListItemIcon>
              <ListItemText primary="Daily Overview" />
          </ListItem>
      </Link>
      <Link to="/analysis" style={{ color: 'black', textDecoration: 'none' }}>
          <ListItem button key="MoodAnalysis">
              <ListItemIcon>
                  <ShowChartIcon />
              </ListItemIcon>
              <ListItemText primary="Mood Analysis" />
          </ListItem>
      </Link>
      <Divider />
      <List>
        <Link to="/info" style={{ color: 'black', textDecoration: 'none' }}>
          <ListItem button key="Info">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
          </ListItem>
        </Link>
        <Link to="/about" style={{ color: 'black', textDecoration: 'none' }}>
          <ListItem button key="About">
              <ListItemIcon>
                  <SentimentSatisfiedAltIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <Link onClick={() => dispatch({ type: 'LOGOUT' })} style={{ color: 'black', textDecoration: 'none' }}>
      <ListItem button key="Logout">
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
      </Link>

    </div>
  );

  return (
    <div>
      <React.Fragment key="bottom">
        <Button onClick={toggleDrawer("bottom", true)} style={{padding: '30px'}}>
            <MenuIcon />
            
        </Button>
        <SwipeableDrawer
          anchor="bottom"
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
          onOpen={toggleDrawer("bottom", true)}
        >
          {list("bottom")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
