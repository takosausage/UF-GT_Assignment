//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

let Register = require('../routes/register');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
console.log("running test");
var assert = chai.assert;

describe('register', function(){
    it('should not be able to insert invalid email into db', function(){
        let request = {
            "teacher": "teacherken@gmail",
            "students":
                [
                "studentjon@example.com",
                "studentmary@example.com"
                ]
        }
        chai.request(server)
            .post('/register')
            .send(request)
            .end((err, res) => {
                res.should.have.status(400);
              done();
            });
    });
});