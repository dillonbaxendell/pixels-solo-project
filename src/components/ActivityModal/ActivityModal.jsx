import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ActivityModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [newActivity, setNewActivity] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (newActivity === "") {
      alert("Please enter an activity or press cancel");
    } else {
      //Adds the activity to the database and activityList (initializes POST request)
      dispatch({
        type: "ADD_ACTIVITY",
        payload: newActivity,
      });

      //This sets the activities for this specific reflection so we can grab it later
      dispatch({
        type: "SET_ACTIVITIES_ASSOCIATIONS",
        payload: newActivity,
      });

      setOpen(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Add Activity
      </button>
      <Modal
        aria-labelledby="activity-modal"
        aria-describedby="activity-modal"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="add-activity">Add Activity</h2>
            <input
              value={newActivity}
              type="text"
              placeholder="activity name"
              onChange={(event) => setNewActivity(event.target.value)}
            />
            <button onClick={handleClose}>Add Activity</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
