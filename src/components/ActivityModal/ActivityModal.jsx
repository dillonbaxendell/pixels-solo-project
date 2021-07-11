//Imports
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./ActivityModal.css";

//Styles for chip components
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
  header: {
    marginBottom: 30,
  },
  closeBtn: {
    marginTop: 50,
    float: "left",
  },
}));

export default function ActivityModal() {
  const classes = useStyles();
  const dispatch = useDispatch();

  //local state
  const [open, setOpen] = useState(false);
  const [newActivity, setNewActivity] = useState("");

  //When the button is clicked, open the modal
  const handleOpen = () => {
    setOpen(true);
  };

  //On submit, do this:
  const handleSubmit = () => {
    //Input validation: if the input is empty, alert the user
    if (newActivity === "") {
      alert("Please enter an activity or close this window");
    }
    //if it's not empty, add the activity
    else {
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

      //close the modal
      setOpen(false);
    }
  };

  //Close the modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="modal">
      <IconButton color="secondary" onClick={handleOpen}>
        <Typography variant="button">Add Activity</Typography>
        <AddIcon />
      </IconButton>

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
            <div className={classes.header}>
              <Typography variant="h4" id="add-activity">
                Add Activity
              </Typography>
            </div>
            <TextField
              value={newActivity}
              type="text"
              placeholder="activity name"
              onChange={(event) => setNewActivity(event.target.value)}
            />
            <Button
              className="modal"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              ADD
            </Button>
            <div>
              <IconButton className={classes.closeBtn} onClick={handleClose}>
                <CloseIcon />
                <Typography variant="button">cancel</Typography>
              </IconButton>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
