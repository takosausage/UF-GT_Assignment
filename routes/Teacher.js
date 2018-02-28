var express = require('express');  
var router = express.Router();  
var Teacher = require('../models/Teacher');

router.get('/:email?', function(req, res, next){
    console.log(JSON.stringify(req.body));
    if (req.params.email) {  
        Teacher.getTeacherById(req.params.email, function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                for (var i = 0, len = rows.length; i < len; i++) {
                    console.log(rows[i]);
                }
                res.json(rows);  
            }  
        });  
    } else {  
        Teacher.getAllTeachers(function(err, rows) {
            var teacherArry = []; 
            if (err) {  
                res.json(err);  
            } else {  
                for (var i = 0, len = rows.length; i < len; i++) {
                    console.log(rows[i].EMAIL);
                    teacherArry.push(rows[i].EMAIL);
                }
                var teachers = {"Teachers": teacherArry};
                console.log(JSON.stringify(teachers));
                res.json(teachers);  
            }  
        });  
    } 
});
router.post('/:email', function(req, res, next) {  
    Teacher.addTeacher(req.params.email, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(req.body); //or return count for 1 & 0  
        }  
    });  
}); 

module.exports = router;