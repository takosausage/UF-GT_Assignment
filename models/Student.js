var db = require('../database_config'); //reference of database_config.js  
var Student = {  
    getAllStudents: function(callback) {  
        return db.query("Select * from roster_student", callback);  
    },  
    getStudentById: function(email, callback) {  
        return db.query("select * from roster_student where EMAIL=?", [email], callback);  
    },  
    addStudent: function(email, callback) {  
        return db.query("Insert into roster_student values(?,?)", [email, 0], callback);  
    },  
    suspendStudent: function(email, callback){
        return db.query("Update roster_student set IS_SUSPENDED = 1 where EMAIL = ?", [email], callback);
    }
    // deleteStudent: function(id, callback) {  
    //     return db.query("delete from Student where Id=?", [id], callback);  
    // },  
    // updateStudent: function(id, Student, callback) {  
    //     return db.query("update Student set Title=?,Status=? where Id=?", [Student.Title, Student.Status, id], callback);  
    // }  
};  
module.exports = Student; 