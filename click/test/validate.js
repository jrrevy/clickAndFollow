var app = require('../app')
var request = require('supertest');

// Basic text assertions
describe('validate/dog.png', function(){
  describe('GET /validate', function(){
    it('should find the title',  function(done){
        request(app)
        .get('/validate/dog.png')
        .expect(/Image\ Chosen/)
        .expect(/You\ have\ chosen\ this\ image/,done)
    })
  })
  
  // Test selected image is "displayed"
  describe('GET /validate/ipad.png', function(){
    it('should find the selected image',  function(done){
        request(app)
        .get('/validate/ipad.png')
        .expect(/src=\"\/img\/ipad.png/, done)
    })
  })
  
   // Test that post a valid email is successful
  describe('POST /validate/ipad.png', function(){
    it('should pass the validation with a@a.fr',  function(done){
    	
    	var payload = {email: 'a@a.fr'};
        request(app)
        .post ('/validate/ipad.png')
        .send (payload)
        .expect(/You passed the test/, done)
    })
  })
  
     // Test that post a invalid email should fail with a message
  describe('POST /validate/ipad.png', function(){
    it('should pass the validation with j@r',  function(done){
    	
    	var payload = {email: 'j@r'};
        request(app)
        .post ('/validate/ipad.png')
        .send (payload)
        .expect(/Invalid email/, done)
    })
  })
})
