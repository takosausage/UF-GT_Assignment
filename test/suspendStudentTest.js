//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

let Suspend = require('../routes/Suspend');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
console.log("running test");
var assert = chai.assert;

describe('suspend', function(){
    it('should not be able to update with invalid email into db', function(){
        let request = {
            "student":
                [
                "studentjon@example"
                ]
        }
        chai.request(server)
            .post('/suspend')
            .send(request)
            .end((err, res) => {
                res.should.have.status(400);
              done();
            });
    });
    it('should be able to update with valid email into db', function(){
        let request = {
            "student": "studentmary@example.com"
        }
        chai.request(server)
            .post('/suspend')
            .send(request)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(204);
              done();
            });
    });
});