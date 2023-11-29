
const ErrorHandler = require ('../utils/ErrorHandler')

const UndefindRoute = async ( req , res , next ) => {

    return next ( new ErrorHandler ("this route not include in application" , 404 ));
}

module.exports = UndefindRoute ;