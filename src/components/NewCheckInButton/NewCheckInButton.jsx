import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import './NewCheckIn.css';

function NewCheckInButton() {
  const history = useHistory();

  const handleClick = () => {
    history.push("/reflection/1");
  };

  return (
    <div className="newCheckIn">
      <IconButton color="secondary" onClick={handleClick} aria-label="new check-in" size="medium">
          <Typography variant="button">New Check-In</Typography>
        <AddIcon fontSize="default" />
      </IconButton>
    </div>
  );
}

export default NewCheckInButton;
