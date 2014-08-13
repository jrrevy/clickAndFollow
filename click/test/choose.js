var app = require('../app')
var request = require('supertest');

// Basic text assertions
describe('choose/dog.png', function(){
  describe('GET /choose', function(){
    it('should find the title',  function(done){
        request(app)
        .get('/choose/dog.png')
        .expect(/Image\ Chosen/)
        .expect(/You\ have\ chosen\ this\ image/,done)
    })
  })
  
  // Test selected image is "displayed"
  describe('GET /choose/ipad.png', function(){
    it('should find the selected image',  function(done){
        request(app)
        .get('/choose/ipad.png')
        .expect(/src=\"\/img\/ipad.png/, done)
    })
  })
})
