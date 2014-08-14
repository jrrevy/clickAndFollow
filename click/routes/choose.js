var express = require('express');
var router = express.Router();

/* GET chosen page. */
router.get('/', function(req, res) {
  res.render('choose', { title: 'Image selection'});
});

module.exports = router;
