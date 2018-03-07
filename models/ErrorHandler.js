var ErrorHandler = {

    generateError: function(error){
        return ({"errCode" : error.code, "errMsg" : error.message});
    }
}
module.exports = ErrorHandler;