//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

let CommonStudent = require('../routes/commonstudents');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
console.log("running test");
var assert = chai.assert;

describe('commonstudents', function(){
    it('should not be able to insert invalid email into db', function(){
        chai.request(server)
            .get('/commonstudents?teacher=teacherken@gmail')
            .end((err, res) => {
                res.should.have.status(400);
              done();
            });
    });
    it('should return list of students upon valid email', function(){
        chai.request(server)
            .get('/commonstudents?teacher=teacherken@gmail.com')
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('array');
              done();
            });
    });
});