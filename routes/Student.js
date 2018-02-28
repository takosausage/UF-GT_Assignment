var express = require('express');  
var router = express.Router();  
var Student = require('../models/Student');

router.get('/:email?', function(req, res, next){
    if (req.params.email) {  
        Student.getStudentById(req.params.email, function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(rows);  
            }  
        });  
    } else {  
        Student.getAllStudents(function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(rows);  
            }  
        });  
    } 
});
router.post('/:email', function(req, res, next) {  
    Student.addStudent(req.params.email, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(count); //or return count for 1 & 0  
        }  
    });  
}); 

module.exports = router;