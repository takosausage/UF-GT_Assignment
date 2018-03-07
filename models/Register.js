var db = require('../database_config'); //reference of database_config.js  
var Register = {  
    getAllRegister: function(callback) {  
        return db.query("Select * from teacher_assigned_students", callback);  
    },  
    getRegisterByTeacher: function(email, callback) {  
        return db.query("select email_student from teacher_assigned_students where email_teacher=?", [email], callback);  
    },
    // getRegisterByMultiTeacher: function(email, callback) {  
    //     var queryString = ("select email_student from teacher_assigned_students where email_teacher = '" + email[0] + "'");
    //     for(var i = 1; i<email.length; ++i){
    //         queryString += (" or email_teacher = '"+email[i]+"'");
    //     }
    //     queryString += "group by email_student having count(email_student) >1;";
    //     return db.query(queryString, callback);  
    // },  
    getRegisterByMultiTeacher: function(email, callback) {  
        arrayLength = [];
        for(var i = 0; i<email.length; ++i){
            arrayLength.push('?');
        }
        var queryString = ("select email_student from teacher_assigned_students where email_teacher IN (");
        queryString += arrayLength.join(',');
        queryString += ") group by email_student having count(email_student) >=?;";
        email.push(email.length);
        console.log(queryString);
        console.log(email);
        return db.query(queryString, email, callback);  
    }, 
    registerStudent: function(email_teacher, email_student, callback) {  
        return db.query("Insert into teacher_assigned_students values(?,?)", [email_teacher, email_student], callback);
    },
    registerMultiStudent: function(insertList, callback){
        var queryString = ("Insert into teacher_assigned_students (email_teacher, email_student) values ?");
        console.log(queryString);
        return db.query(queryString, [insertList],callback);
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