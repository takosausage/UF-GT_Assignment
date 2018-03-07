var mysql = require('mysql');  
var connection = mysql.createPool({  
    host: 'localhost',
    port: 63316,  
    user: 'yuchao',  
    password: 'c7t98z77',  
    database: 'govtech_assignment_yuchao'  
});  
module.exports = connection;  