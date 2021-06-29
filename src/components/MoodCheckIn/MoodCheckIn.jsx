import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';


function MoodCheckIn() {
  const history = useHistory();
  const dispatch = useDispatch();

  const moodValue = useSelector(store => store.moodValue);
  console.log("The moodValue is:", moodValue);

  const handleNextPage = () => {
    console.log('clicked NEXT');

    //Go to Word Associations view
    history.push('/reflection/2');
  }

  return (
    <>
      <form>
        <div id="mood-check-in">
          <h2>How are you doing today?</h2>

          <select
            value={moodValue}
            onChange={(event) => dispatch({type: 'SET_MOOD', payload: event.target.value })}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <button onClick={handleNextPage}>NEXT</button>
        </div>

      </form>
    </>
  );
}

export default MoodCheckIn;
