import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory } from "react-router-dom";



function NewCheckInButton () {
    const history = useHistory();

    const handleClick = () => {
        history.push('/reflection/1');
    }


    return (
        <>
        <IconButton onClick={handleClick} aria-label="new check-in" size="large">
        <div>
              <p>New Check-In</p>
          </div>
          <AddCircleIcon fontSize="large" />

        </IconButton>

        </>
    )
}

export default NewCheckInButton;