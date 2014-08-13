var app = require('../app')
var request = require('supertest');

// Basic text assertions
describe('index', function(){
  describe('GET /', function(){
    it('should find the text',  function(done){
        request(app)
        .get('/')
        .expect(/Click\ an\ image\ App/, done)
    })
  })
  
  describe('GET /', function(){
    it('should find 3 links to choose page',  function(done){
        request(app)
        .get('/')
        .expect(/href=\"\/choose\/ipad.png/)
        .expect(/href=\"\/choose\/dog.png/)
        .expect(/href=\"\/choose\/phones.png/, done)
    })
  })
})
