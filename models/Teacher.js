var db = require('../database_config'); //reference of database_config.js  
var Teacher = {  
    getAllTeachers: function(callback) {  
        return db.query("Select * from roster_teacher", callback);  
    },  
    getTeacherById: function(email, callback) {  
        return db.query("select * from roster_teacher where EMAIL=?", [email], callback);  
    },  
    addTeacher: function(email, callback) {  
        return db.query("Insert into roster_teacher values(?)", [email], callback);  
    }  
    // deleteTeacher: function(id, callback) {  
    //     return db.query("delete from Teacher where Id=?", [id], callback);  
    // },  
    // updateTeacher: function(id, Teacher, callback) {  
    //     return db.query("update Teacher set Title=?,Status=? where Id=?", [Teacher.Title, Teacher.Status, id], callback);  
    // }  
};  
module.exports = Teacher; 