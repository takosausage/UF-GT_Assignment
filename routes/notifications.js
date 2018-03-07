var express = require('express');  
var router = express.Router();  
var validator = require('email-validator');
var Notification = require('../models/Notification');
var Teacher = require('../models/Teacher');
var Student = require('../models/Student');

//select distinct email from roster_student inner join teacher_assigned_students on roster_student.email = teacher_assigned_students.email_student 
//where IS_SUSPENDED = 0 and (email_teacher = 'teacherleon@gmail.com' or email_student = 'commonstudent1@gmail.com' or email_student = 'commonstudent2@gmail.com');

router.post('/', function(req, res, next) {  
    console.log(req.body.teacher);
    console.log(req.body.notification);
    var teacher = req.body.teacher;
    var notification = req.body.notification;
    var failed = false;
    //validate teacher email, send error if email is not valid
    if(!validateEmail(teacher)){
        res.status(400);
        res.send(JSON.stringify({"status": 400, "error": "Teacher email is not valid.", "response": null}));
        return;
    }

    console.log("Processing notification for @mentions...");

    var pattern = /\B@[a-z0-9_@.-]+/gi;
    var studentList = notification.match(pattern);
    console.log(studentList);
    var cleanStudentList = []
    //validate student email, send error if any student email is not valid
    if (null != studentList){
        for(var i = 0, len = studentList.length; i < len; i++){
            if(!validateEmail(studentList[i].substr(1))){
                res.status(400);
                res.send(JSON.stringify({"status": 400, "error": "One or more Student emails are invalid", "response": null}))
                return;
            }
            else{
                cleanStudentList.push(studentList[i].substr(1));
            }
        }
    }
    console.log (cleanStudentList instanceof Array);
    Notification.getNotification(teacher, cleanStudentList, function(err, rows) {  
                    if (err) {  
                        res.status(500);
                        res.send(JSON.stringify({"status": 500, "error": "System/Database Error", "response": null}))
                    } else {  
                        var studentArry = [];
                        console.log(JSON.stringify(rows));
                        
                        for (var i = 0, len = rows.length; i < len; i++) {
                            console.log(rows[i].email);
                            studentArry.push(rows[i].email);
                        }
                        var recipients = {"Recipients": studentArry};
                        console.log(JSON.stringify(recipients));
                        res.setHeader('Content-Type', 'application/json');
                        res.json(recipients); 
                    }  
                });
}); 

function validateEmail(email){
    return validator.validate(email);
}
module.exports = router;