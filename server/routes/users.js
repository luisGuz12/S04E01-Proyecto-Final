var express = require('express');
var router = express.Router();

// GET /users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET /users/author
router.get('/author', function(_, res) {
  res.render('author', {author: " Luis Guzman & josh barajas"});
});

module.exports = router;