import { useSelector } from "react-redux";
import Chip from "@material-ui/core/Chip";


function ActivityItem ({activity, classes, setActivity, editActivity, handleSelect}) {



    return (
        <>
              <li
                key={word.id}
                onClick={() => {
                  setWord({ id: word.id, word_name: word.word_name });
                }}
              >
                <Chip
                  color={ editWord.word_name === word.word_name ? 'primary' : 'default'}
                  label={word.word_name}
                  className={classes.chip}
                ></Chip>
              </li>
        </>
    )
}

export default ActivityItem