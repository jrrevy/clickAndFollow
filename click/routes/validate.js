var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');

/* GET chosen page. */
router.get('/:path', function(req, res) {
  res.render('validate', {
	  	title: 'Image Chosen',
	  	imagePath: req.params.path,
        message: '',
  });
});

/* GET congratulation page. */
router.post('/:path', function(req, res) {
	console.log("Email validation : ["+ req.body.email+ "]");
	req.assert('email', 'A valid email is required').isEmail();  //Validate email

    var errors = req.validationErrors();  
    if( !errors){   //No errors were found.  Passed Validation!
    	console.log("No error, should go to 'Congrats Page'");
    	res.render('congrats', { title: 'Congratulations !' });
       
    }
    else {   //Display errors to user
        res.render('validate', { 
            title: 'Form validation failed',
            message: 'Invalid email',
            errors: errors,
            imagePath: req.params.path
        });
    }
    
  
});
module.exports = router;
