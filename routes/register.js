var express = require('express');  
var router = express.Router();  
var validator = require('email-validator');
var Register = require('../models/Register');

router.get('/:email?', function(req, res, next){
    if (req.params.email) {  
        Register.getRegisterByTeacher(req.params.email, function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(rows);  
            }  
        });  
    } else {  
        Register.getAllRegister(function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(rows);  
            }  
        });  
    } 
});
router.post('/', function(req, res, next) {  
    console.log(req.body);
    console.log(req.body.teacher);
    console.log(req.body.students);
    var teacher = req.body.teacher;
    var studentArry = req.body.students;
    //validate teacher email, send error if email is not valid
    if(!validateEmail(teacher)){
        res.status(400);
        res.send(JSON.stringify({"status": 400, "error": "Teacher email is not valid.", "response": null}));
        return;
    }

    //validate student email, send error if any student email is not valid
    for(var i = 0, len = studentArry.length; i < len; i++){
        if(!validateEmail(studentArry[i])){
            res.status(400);
            res.send(JSON.stringify({"status": 400, "error": "One or more Student emails are invalid", "response": null}))
            return;
        }
    }
    
    if (studentArry instanceof Array){
        //console.log("checking if students exists...");
        Register.registerMultiStudent(teacher, studentArry, function(err, count) {  
            if (err) { 
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
              }
            else{
                res.status(204);
                res.json(JSON.stringify(req.body));  
                //res.send("Success");
            }
        });
        
    }
    else{
        Register.registerStudent(teacher, studentArry, function(err, count) {  
            console.log(studentArry);
            if (err) {  
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
            } else {  
                res.status(204); //or return count for 1 & 0
                res.json(JSON.stringify(req.body));  
                //res.send("Success");
            }  
        });  
    }
}); 

function validateEmail(email){
    return validator.validate(email);
}
module.exports = router;