const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "relationship" WHERE "relationship".user_id = $1;`;

  pool.query(queryText, [req.user.id])
  .then( result => {
      res.send(result.rows);
  })
  .catch( error => {
      console.log('Error in GET relationship.router.js', error);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  const newRelationship = req.body;
  console.log('newRelationship is:', newRelationship);

  const queryText = `INSERT INTO "relationship" ("name", "relationship_to_user", "relationship_icon", "user_id") VALUES ($1, $2, $3, $4);`

  const values = [req.body.name, req.body.relationship_to_user, req.body.relationship_icon, req.body.user_id];

  pool.query(queryText, values)
  .then( () => {

      res.sendStatus(201);

  })
  .catch( error => {
      console.log('Error in postRelationship', error);
  })
});

module.exports = router;