var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Click an image App \'',admin:false });
});

router.post('/', function(req, res) {
	  res.render('index', { title: 'Administrator',admin:true });
});
module.exports = router;
