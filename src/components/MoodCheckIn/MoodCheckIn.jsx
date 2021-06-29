import {useDispatch, useSelector} from 'react-redux';
import NextButton from '../NextButton/NextButton';


function MoodCheckIn() {
  const dispatch = useDispatch();

  const moodValue = useSelector(store => store.moodValue);
  console.log("The moodValue is:", moodValue);


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

          <NextButton pageRoute="/reflection/2" />
        </div>

      </form>
    </>
  );
}

export default MoodCheckIn;
