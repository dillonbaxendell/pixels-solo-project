import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";

function NewCheckInButton() {
  const history = useHistory();

  const handleClick = () => {
    history.push("/reflection/1");
  };

  return (
    <>
      <IconButton onClick={handleClick} aria-label="new check-in" size="medium">
        <div>
          <p>New Check-In</p>
        </div>
        <AddIcon fontSize="default" />
      </IconButton>
    </>
  );
}

export default NewCheckInButton;
