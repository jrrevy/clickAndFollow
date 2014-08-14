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
})
