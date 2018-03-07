var express = require('express');  
var router = express.Router();  
var validator = require('email-validator');
var Student = require('../models/Student');

router.post('/', function(req, res, next) {  
    console.log(req.body.student);
    var student = req.body.student;
    if(!validator.validate(student)){
        res.status(400);
        res.send(JSON.stringify({"status": 400, "error": "Teacher email is not valid.", "response": null}));
        return;
    }
    Student.suspendStudent(student, function(err, count) {  
        if (err) {  
            res.status(500);
            res.send(JSON.stringify({"status": 500, "error": "System/Database Error", "response": null}))
        } else {  
            console.log(count);
            res.status(204); //or return count for 1 & 0
            res.json(JSON.stringify(count));   
        }  
    });  
}); 

module.exports = router;