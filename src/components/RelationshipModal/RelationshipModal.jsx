import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import './RelationshipModal.css';

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
  closeBtn: {
    marginTop: 50,
    float: 'left'
  },
  header: {
    marginBottom: 30
  }
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
    <div className="modal">
      <IconButton color="secondary" onClick={handleOpen}>
      <Typography variant="button">Add Relation</Typography>
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
            <div className={classes.header}>
            <Typography variant="h4" id="add-activity">Add Relationship</Typography>
            </div>
            <div>
            <TextField
              className={classes.header}
              value={name}
              type="text"
              placeholder="name"
              onChange={(event) => setName(event.target.value)}
            />
            </div>
            <div>
            <Select  className={classes.header} native id="relation-category" onChange={(event) => setRelation(event.target.value)}>
                <option>---SELECT---</option>
                <option value="Friend">Friend</option>
                <option value="Co-Worker">Co-Worker</option>
                <option value="Partner">Partner</option>
                <option value="Family">Family</option>
                <option value="Pet">Pet</option>
            </Select>
            </div>
            <div>
            <Button className="modal" variant="contained" color="primary" onClick={handleSubmit}>ADD</Button>
            </div>
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