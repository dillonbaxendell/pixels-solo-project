const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
  // GET route code here
  const queryText = `SELECT * FROM "activity";`;

  pool.query(queryText)
  .then( result => {
      res.send(result.rows);
  })
  .catch( error => {
      console.log('Error in GET activity.router.js', error);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  const newActivity = req.body.activity_name;
  console.log('newActivity is:', newActivity);
  const userID = req.user.id;

  const queryText = `INSERT INTO "activity" ("activity_name", "user_id") VALUES ($1, $2);`;

  pool.query(queryText, [newActivity, userID])
  .then( () => {
      res.sendStatus(201);
  })
  .catch( error => {
      console.log('Error in postActivity', error);
  })
});

module.exports = router;