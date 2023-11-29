

class ErrorHandler extends Error {
    constructor ( message , status ) {
        super(message);
        this.StatusCode = status || 500 ;
        this.isOperated = status ? "field" : "error" ;
    }
}


module.exports = ErrorHandler ;