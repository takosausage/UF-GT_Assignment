var express = require('express');  
var router = express.Router();  
var validator = require('email-validator');
var Register = require('../models/Register');

router.get('/', function(req, res, next){
    console.log(req.query.teacher);
    console.log(JSON.stringify(req.body));
    var teacherArry = req.query.teacher;

    if (teacherArry instanceof Array) {  
        //validate list of teacher email, send error if any student email is not valid
        var teacherList = [];
        for(var i = 0, len = teacherArry.length; i < len; i++){
            if(!validateEmail(teacherArry[i])){
                res.status(400);
                res.send(JSON.stringify({"status": 400, "error": "One or more Student emails are invalid", "response": null}))
                return;
            }
            else {
                teacherList.push([teacherArry[i]])
            }
        }
        Register.getRegisterByMultiTeacher(teacherList, function(err, rows) {  
            if (err) {  
                console.log(err);
                res.status(500);
                res.send(JSON.stringify({"status": 500, "error": "System/Database Error", "response": null}))
            } else {
                var studentArry = [];
                console.log(JSON.stringify(rows));
                
                for (var i = 0, len = rows.length; i < len; i++) {
                    console.log(rows[i].email_student);
                    studentArry.push(rows[i].email_student);
                }
                var students = {"Students": studentArry};
                console.log(JSON.stringify(students));
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(students);
            }  
        });  
    } else {  
        //validate teacher email, send error if email is not valid
        if(!validateEmail(teacherArry)){
            res.status(400);
            res.send(JSON.stringify({"status": 400, "error": "Teacher email is not valid.", "response": null}));
            return;
        }
        Register.getRegisterByTeacher(teacherArry, function(err, rows) {  
            if (err) { 
                res.status(500);
                res.send(JSON.stringify({"status": 500, "error": "System/Database Error", "response": null}))  
            } else {  
                var studentArry = [];
                console.log(JSON.stringify(rows));
                
                for (var i = 0, len = rows.length; i < len; i++) {
                    console.log(rows[i].email_student);
                    studentArry.push(rows[i].email_student);
                }
                var students = {"Students": studentArry};
                console.log(JSON.stringify(students));
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(students);
            }  
        });  
    } 
}); 

function validateEmail(email){
    return validator.validate(email);
}
module.exports = router;