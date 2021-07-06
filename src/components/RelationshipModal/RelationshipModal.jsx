import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from "@material-ui/icons/Close";

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

export default function RelationshipModal() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userID = useSelector((store) => store.user.id);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");

  const newRelationship = {
      name: name,
      relationship_to_user: relation,
      relationship_icon: '.img',
      user_id: userID
  }

  console.log('New Relationship:', newRelationship);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    if (name === "" || relation === '') {
      alert("Please enter a relationship or press cancel");
    } else {
      //Adds the activity to the database and activityList (initializes POST request)
      dispatch({
        type: "ADD_RELATIONSHIP",
        payload: newRelationship,
      });

      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      <IconButton color="primary" onClick={handleOpen}>
      <p>Add Relation</p>
        <AddIcon />
      </IconButton>
      <Modal
        aria-labelledby="relationship-modal"
        aria-describedby="relationship-modal"
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
            <h2 id="add-activity">Add Relationship</h2>
            <input
              value={name}
              type="text"
              placeholder="name"
              onChange={(event) => setName(event.target.value)}
            />
            <select onChange={(event) => setRelation(event.target.value)}>
                <option>---SELECT---</option>
                <option value="Friend">Friend</option>
                <option value="Co-Worker">Co-Worker</option>
                <option value="Partner">Partner</option>
                <option value="Family">Family</option>
                <option value="Pet">Pet</option>
            </select>
            <button onClick={handleSubmit}>Add Activity</button>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}