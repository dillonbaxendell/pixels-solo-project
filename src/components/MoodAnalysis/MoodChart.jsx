import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import {
  Chart,
  PieSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

export default function MoodCount({ moodData }) {


  return (
    <Container>
      <Paper>
        <Chart data={moodData}>
          <PieSeries
            valueField="count"
            argumentField="mood"
            innerRadius={0.6}
          />


             <Title text="Your Mood Overall" />
             <Legend
          orientation="horizontal"
          itemTextPosition="right"
          horizontalAlignment="center"
          verticalAlignment="bottom"
          columnCount={1} />
                  {/* <Export enabled={true} />
        <Series argumentField="country" valueField="medals"></Series> */}
          <Animation />
        </Chart>
      </Paper>
    </Container>
  );
}
