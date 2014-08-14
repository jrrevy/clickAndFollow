var express = require('express');
var router = express.Router();

/* GET congratulation page. */
router.post('/', function(req, res) {
  res.render('congrats', { title: 'Congratulations !' });
});

module.exports = router;
