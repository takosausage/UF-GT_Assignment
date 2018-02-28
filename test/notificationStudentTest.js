//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

let Notification = require('../routes/notifications');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
console.log("running test");
var assert = chai.assert;

describe('notification', function(){
    it('should not be able to post with invalid teacher email', function(){
        let request = {
            "teacher":  "teacherken@gmail",
            "notification": "Hello students! @studentagnes@example.com @studentmiche@example.com"
          }
        chai.request(server)
            .post('/notifications')
            .send(request)
            .end((err, res) => {
                res.should.have.status(400);
              done();
            });
    });
    it('should not be able to post with invalid student email', function(){
        let request = {
            "teacher":  "teacherken@gmail.com",
            "notification": "Hello students! @studentagnes@exa@mple.com @studentmiche@example.com"
          }
        chai.request(server)
            .post('/notifications')
            .send(request)
            .end((err, res) => {
                res.should.have.status(400);
              done();
            });
    });
    it('should be able to post with valid email with response', function(){
        let request = {
            "teacher":  "teacherleon@gmail.com",
            "notification": "Hello students! @commonstudent1@gmail.com @commonstudent2@gmail.com"
          }
        chai.request(server)
            .post('/notifications')
            .send(request)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('array');
              done();
            });
    });
});