var mysql = require('mysql');  
var connection = mysql.createPool({  
    host: 'localhost',
    port: 63316,  
    user: 'user123',  
    password: 'abc123',  
    database: 'database_dev'  
});  
module.exports = connection;  
