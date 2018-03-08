var db = require('../database_config'); //reference of database_config.js  
var Notification = {  
    getNotification: function(email_teacher, email_student, callback) {  
//select distinct email from roster_student inner join teacher_assigned_students on roster_student.email = teacher_assigned_students.email_student 
//where IS_SUSPENDED = 0 and (email_teacher = 'teacherleon@gmail.com' or email_student = 'commonstudent1@gmail.com' or email_student = 'commonstudent2@gmail.com');
        var queryString = "select distinct email from roster_student inner join teacher_assigned_students on ";
        queryString += "roster_student.email = teacher_assigned_students.email_student ";
        queryString += "where IS_SUSPENDED = 0 and (email_teacher = ?'";
        var consolidatedArray = [];
        consolidatedArray.push(email_teacher);
        if(email_student != null){
            if(email_student instanceof Array){
                for (var i = 0; i<email_student.length; ++i){
                    queryString += (" or email_student = ?'");
                    consolidatedArray.push(email_student[i]);
                }
            }
            else if(email_student.length != 0){
                queryString += (" or email_student = ?'" + email_student + "'");
                consolidatedArray.push(email_student);
            }
        }
        queryString += (");");
        console.log(queryString);
        return db.query(queryString, consolidatedArray, callback);  
    } 
    // getTeacherById: function(email, callback) {  
    //     return db.query("select * from roster_teacher where EMAIL=?", [email], callback);  
    // },  
    // addTeacher: function(email, callback) {  
    //     return db.query("Insert into roster_teacher values(?)", [email], callback);  
    // }  
    // deleteTeacher: function(id, callback) {  
    //     return db.query("delete from Teacher where Id=?", [id], callback);  
    // },  
    // updateTeacher: function(id, Teacher, callback) {  
    //     return db.query("update Teacher set Title=?,Status=? where Id=?", [Teacher.Title, Teacher.Status, id], callback);  
    // }  
};  
module.exports = Notification; 