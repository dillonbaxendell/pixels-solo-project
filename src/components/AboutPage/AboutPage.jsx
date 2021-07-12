import React from 'react';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <Container>
      <div style={{marginBottom: '30px'}}>
      <Typography variant="h3" color='primary'>Thank You!</Typography>
      </div>
      <div>
        <Typography variant="subtitle1"><b>Technologies used:</b></Typography>
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
      <div>
      <Typography variant="subtitle1"><b>Some features I'm excited to include in the future:</b></Typography>
      <ul>
          <li>An analysis feature that dives deeper into how specific activities and relationships influence the mood.</li>
          <li>A note feature to add to any reflection</li>
          <li>Icon features to improve the app aesthetic</li>
        </ul>
      </div>
    </Container>
  );
}

export default AboutPage;
