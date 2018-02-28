var db = require('../database_config'); //reference of database_config.js  
var Register = {  
    getAllRegister: function(callback) {  
        return db.query("Select * from teacher_assigned_students", callback);  
    },  
    getRegisterByTeacher: function(email, callback) {  
        return db.query("select email_student from teacher_assigned_students where email_teacher=?", [email], callback);  
    },
    getRegisterByMultiTeacher: function(email, callback) {  
        var queryString = ("select email_student from teacher_assigned_students where email_teacher = '" + email[0] + "'");
        for(var i = 1; i<email.length; ++i){
            queryString += (" or email_teacher = '"+email[i]+"'");
        }
        queryString += "group by email_student having count(email_student) >1;";
        return db.query(queryString, callback);  
    },  
    registerStudent: function(email_teacher, email_student, callback) {  
        return db.query("Insert into teacher_assigned_students values(?,?)", [email_teacher, email_student], callback);
    },
    registerMultiStudent: function(email_teacher, email_students, callback){
        var queryString = ("Insert into teacher_assigned_students values");
        for(var i = 0; i<email_students.length; ++i){
            queryString += "('"+email_teacher+"','"+email_students[i]+"'),";
        }
        queryString = queryString.slice(0,-1);
        queryString += ";";
        console.log(queryString);
        return db.query(queryString,callback);
    },

    getActiveStudentRegisterByTeacher: function(email_teacher, email_students, callback){
        var queryString = ("select email from roster_student inner join teacher_assigned_students on roster_student.email = teacher_assigned_students.email_student where IS_SUSPEND = 0 AND");
         "email_teacher = 'teacherleon@gmail.com';"
         return db.query
    }
    // deleteStudent: function(id, callback) {  
    //     return db.query("delete from Student where Id=?", [id], callback);  
    // },  
    // updateStudent: function(id, Student, callback) {  
    //     return db.query("update Student set Title=?,Status=? where Id=?", [Student.Title, Student.Status, id], callback);  
    // }  
};  
module.exports = Register; 