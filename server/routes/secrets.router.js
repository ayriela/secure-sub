const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// Handles Ajax request for user information if user is authenticated
/* router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
}); */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    const queryValues=[req.user.clearance_level];
    pool.query('SELECT * FROM "secret" WHERE secrecy_level< $1;',queryValues)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
});

module.exports = router;