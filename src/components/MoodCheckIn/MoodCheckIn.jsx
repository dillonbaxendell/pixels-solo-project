import {useDispatch, useSelector} from 'react-redux';
import NextButton from '../NextButton/NextButton';
import mood1 from '../MoodCheckIn/MOOD1.JPEG';
import mood2 from '../MoodCheckIn/MOOD2.JPEG';
import mood3 from '../MoodCheckIn/MOOD3.JPEG';
import mood4 from '../MoodCheckIn/MOOD4.JPEG';
import mood5 from '../MoodCheckIn/MOOD5.JPEG';



function MoodCheckIn() {
  const dispatch = useDispatch();
  const moodIcons = [{value: 1, img: mood1}, {value: 2, img: mood2}, {value: 3, img: mood3}, {value: 4, img: mood4}, {value: 5, img: mood5}];

  const moodValue = useSelector(store => store.moodValue);
  console.log("The moodValue is:", moodValue);

  const handleClick =(mood) => {
    console.log('clicked an image');

    dispatch({ type: 'SET_MOOD', payload: mood});
  }

  return (
    <>
      <form>
        <div id="mood-check-in">
          <h2>How are you doing today?</h2>
          <div>
            {moodIcons.map( mood => {
              return( <img key={mood.value} value={mood.value} src={mood.img} width="75px" height="75px" onClick={() => handleClick(mood)}/>
            )})}
            </div>

          <NextButton pageRoute="/reflection/2" />
        </div>

      </form>
    </>
  );
}

export default MoodCheckIn;
