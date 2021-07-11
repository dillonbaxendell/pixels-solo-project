import React from 'react';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <Container>
      <Typography variant="h3">Thank You!</Typography>
      <div>
        <Typography variant="subtitle1">Technologies used:</Typography>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Saga</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>PostgreSQL</li>
          <li>Chart.js</li>
        </ul>
      </div>
    </Container>
  );
}

export default InfoPage;
