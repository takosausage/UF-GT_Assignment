var express = require('express');  
var router = express.Router();  
var validator = require('email-validator');
var Student = require('../models/Student');

// router.get('/:email?', function(req, res, next){
//     if (req.params.email) {  
//         Student.getStudentById(req.params.email, function(err, rows) {  
//             if (err) {  
//                 res.json(err);  
//             } else {  
//                 res.json(rows);  
//             }  
//         });  
//     } else {  
//         Student.getAllStudents(function(err, rows) {  
//             if (err) {  
//                 res.json(err);  
//             } else {  
//                 res.json(rows);  
//             }  
//         });  
//     } 
// });
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
            res.status(500).send(JSON.stringify({"status": 500, "error": err, "response": null}));
        } else {  
            console.log(count);
            res.status(204); //or return count for 1 & 0
            res.json(JSON.stringify(count));   
        }  
    });  
}); 

module.exports = router;