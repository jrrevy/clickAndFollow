var app = require('../app')
var request = require('supertest');


describe('choose', function(){

	// Basic text assertions
	  describe('GET /choose', function(){
		it('should find the title',  function(done){
		    request(app)
		    .get('/choose')
		    .expect(/Image\ selection/)
		    .expect(/Please select an image/,done)
		    })
	  })
  
 	// Verify that 3 images are present on the page
	describe('GET /validate', function(){
		it('should find 3 links to choose page',  function(done){
			request(app)
			.get('/choose')
			.expect(/href=\"\/validate\/ipad.png/)
			.expect(/href=\"\/validate\/dog.png/)
			.expect(/href=\"\/validate\/phones.png/, done)
		})
	})
})
