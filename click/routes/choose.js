var express = require('express');
var router = express.Router();

/* GET chosen page. */
router.get('/:path', function(req, res) {
  res.render('choose', { title: 'Image Chosen',imagePath: req.params.path});
});

module.exports = router;
