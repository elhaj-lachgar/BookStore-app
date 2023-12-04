const { check } = require ('express-validator');
const ValidatorMiddleware = require ('../../middleware/ValidatorMiddleware');

exports.CreateBookValidator  = [
    check('author')
    .notEmpty()
    .withMessage("author is required"),

    check('title')
    .notEmpty()
    .withMessage(" description is required"),

    check('name')
    .notEmpty()
    .withMessage("title is required "),

    check('price')
    .notEmpty()
    .withMessage("price is required")
    .isFloat()
    .withMessage("price not valid "),

    ValidatorMiddleware,
]

exports.UpdateBookValidator = [

    check("id")
    .notEmpty()
    .withMessage(" book id is required")
    .isMongoId()
    .withMessage(" book id not valid")
    .custom(( value , {req} ) => {
        const { author , description , title , name , price } = req.body;

        const isValid = author || description || title || name || price;

        if ( !isValid )
          throw new Error ('all params are empty');

        return true ;
    }),

    check('price')
    .optional()
    .isFloat()
    .withMessage("price not valid "),

    ValidatorMiddleware,

]

exports.DeleteBookValidator = [
    check("id")
    .notEmpty()
    .withMessage(" book id is required")
    .isMongoId()
    .withMessage(" book id not valid"),

    ValidatorMiddleware
]


exports.GetBookValidator = [
    check("id")
    .notEmpty()
    .withMessage(" book id is required")
    .isMongoId()
    .withMessage(" book id not valid"),

    ValidatorMiddleware
]