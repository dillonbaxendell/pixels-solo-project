const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route
 * grab the count of each mood for our doughnut chart
 */
router.get("/total", (req, res) => {
  // GET route code here
  const queryText = `SELECT count(mood), mood
  FROM reflection
  GROUP BY "mood"
  ORDER BY mood ASC;`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GET mood total", error);
    });
});

/**
 * GET route
 * grab the mood from each of the reflections made today
 * this data is for our line graph
 */
router.get("/today", (req, res) => {
  // GET route code here
  const queryText = `SELECT mood, id
    FROM reflection
    WHERE "reflection".time = 'today'
    ORDER BY id ASC;`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GET mood total", error);
    });
});

module.exports = router;
