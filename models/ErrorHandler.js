var ErrorHandler = {

    generate400Error: function(error){
        return ({"errCode" : error.code, "errMsg" : error.message});
    }
}
module.exports = ErrorHandler;