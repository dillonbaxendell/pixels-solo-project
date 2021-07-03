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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';


// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: "auto",
//   },
//   link: { color: 'black', textDecoration: 'none' },
// });

export default function Nav() {
//   const classes = useStyles();
  const user = useSelector((store) => store.user);


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
    //   className={clsx(classes.list, {
    //     [classes.fullList]: anchor === "top" || anchor === "bottom",
    //   })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <Link to={loginLinkData.path} style={{ color: 'black', textDecoration: 'none' }}>
        <ListItem button key="Home">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={loginLinkData.text} />
        </ListItem>
    </Link>
      </List>
      <Divider />
      <List>
        <Link to="/info" style={{ color: 'black', textDecoration: 'none' }}>
          <ListItem button key="Info">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
          </ListItem>
        </Link>
        <Link to="/about" style={{ color: 'black', textDecoration: 'none' }}>
          <ListItem button key="About">
              <ListItemIcon>
                  <MailIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
          </ListItem>
        </Link>
      </List>

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
