

const ErrorRoute = async ( error , req , res , next ) => {
    
    let ObjError = {} ;

    if ( process.env.NODE_ENV == "dev") {
        ObjError.error = error ;
        ObjError.stack = error.stack ;
        ObjError.isOperated = error.isOperated ;
    }

    if ( process.env.NODE_ENV = "pro" ) {
        ObjError.error = error.message;
        ObjError.isOperated = error.isOperated;
    }


    return res.status(error.StatusCode).json({ error : ObjError });

}


module.exports = ErrorRoute ;