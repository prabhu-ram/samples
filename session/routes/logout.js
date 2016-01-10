var express = require('express');
var router = express.Router();

router.get('/', checkAuth, function(req, res, next) {
	// route's functionality
});

// put this method as part of a Service so they can be shared
function checkAuth(req, res, next) {

console.log("----------------------------");

  if (!req.sessionID) {
    res.send('You are not authorized to view this page');
    // res.redirect('/login');
  } else {
    next();
  }
}

module.exports = router;
