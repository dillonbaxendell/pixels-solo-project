import { useDispatch, useSelector } from "react-redux";
import NextButton from "../NextButton/NextButton";
import mood1 from "../../Images/MOOD1.JPEG"
import mood2 from "../../Images/MOOD2.JPEG";
import mood3 from "../../Images/MOOD3.JPEG";
import mood4 from "../../Images/MOOD4.JPEG";
import mood5 from "../../Images/MOOD5.JPEG";
import { Container, Grid, Typography, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import './MoodCheckIn.css';

function MoodCheckIn() {
  const dispatch = useDispatch();
  const moodIcons = [
    { value: 5, img: mood5 },
    { value: 4, img: mood4 },
    { value: 3, img: mood3 },
    { value: 2, img: mood2 },
    { value: 1, img: mood1 },
  ];

  const moodValue = useSelector((store) => store.moodValue);
  const history = useHistory();
  console.log("The moodValue is:", moodValue);

  const handleClick = (mood) => {
    console.log("clicked an image");

    dispatch({ type: "SET_MOOD", payload: mood });

    const timer = setTimeout(() => {
      history.push('/reflection/2')
    }, 100);
  };

  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
      <Paper elevation={3}>
        <div id="mood-check-in">
          <div id="header">
          <Typography align="center" variant="h3">how are you doing today?</Typography>
          </div>
          <div>
            {moodIcons.map((mood) => {
              return (
                <div id="mood">
                <img
                  key={mood.value}
                  value={mood.value}
                  src={mood.img}
                  width="150px"
                  height="150px"
                  className="img"
                  onClick={() => handleClick(mood)}
                />
                </div>
              );
            })}
          </div>
          <div className="arrows">
          <NextButton pageRoute="/reflection/2" />
          </div>
        </div>
        </Paper>
      </Grid>
    </Container>
  );
}

export default MoodCheckIn;
