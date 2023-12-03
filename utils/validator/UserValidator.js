
const { check } = require ('express-validator') ;

const ValidatorMiddleware = require ('../../middleware/ValidatorMiddleware');



exports.CreateUserValidator = [

    check("name")
    .notEmpty()
    .withMessage(" name of user is required "),

    check("email")
    .notEmpty()
    .withMessage(" email of user is required ")
    .isEmail()
    .withMessage(" email not valid form"),
    
    check('password')
    .notEmpty()
    .withMessage(" password of user is required ")
    .isLength({min : 8 , max : 16})
    .withMessage(" password must be betwwen 8 to 16 charcters"),

    check("role")
    .optional()
    .custom( value => {

        const isValid = [ "user" , "admin" , "manager"].includes(value);

        if ( !isValid )
          throw new Error (" this role not include in systeme ");

        return true ;

    }),
    ValidatorMiddleware
]


exports.UpdateUserValidator = [

    check('id')
    .notEmpty()
    .withMessage(" user id is required ")
    .isMongoId()
    .withMessage(" user id not valid ")
    .custom ( ({req}) => {

        if ( req.body.name || req.body.email || req.body.role ){
            req.body = {
                name : req.body || undefined ,
                email : req.body.email || undefined ,
                role : req.body.role || undefined ,
            }

            return true ;
        }

        throw new Error (" all params empty ");

    }),

    check("email")
    .optional()
    .isEmail()
    .withMessage(" email not valid form"),

    check("role")
    .optional()
    .custom( value => {

        const isValid = [ "user" , "admin" , "manager"].includes(value);

        if ( isValid )
          throw new Error (" this role not include in systeme ");

        return true ;

    }),

    ValidatorMiddleware
]


exports.DeleteUserValidator = [
    check('id')
    .notEmpty()
    .withMessage(" user id is required ")
    .isMongoId()
    .withMessage(" user id not valid "),
    ValidatorMiddleware
]


exports.GetUserValidator = [
    check('id')
    .notEmpty()
    .withMessage(" user id is required ")
    .isMongoId()
    .withMessage(" user id not valid "),
    
    ValidatorMiddleware
]

exports.LogAdminValidator = [
    
    check("email")
    .notEmpty()
    .withMessage(" email of user is required ")
    .isEmail()
    .withMessage(" email not valid form"),
    
    check('password')
    .notEmpty()
    .withMessage(" password of user is required ")
    .isLength({min : 8 , max : 16})
    .withMessage(" password must be betwwen 8 to 16 charcters"),
    ValidatorMiddleware
]