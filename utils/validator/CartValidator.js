
const { check } = require ('express-validator');

const ValidatorMiddleware = require ('../../middleware/ValidatorMiddleware');


exports.AddElementToCartValidator = [
    check ('id')
    .notEmpty()
    .withMessage(" id  is required ")
    .isMongoId()
    .withMessage("not valid id"),

    check('bookId')
    .notEmpty()
    .withMessage("book id is required")
    .isMongoId()
    .withMessage(" book id not valid"),
] 

exports.DeleteElementFromCartValidator = [
    check("id")
    .notEmpty()
    .withMessage(" id  is required ")
    .isMongoId()
    .withMessage("not valid id"),

    check('bookId')
    .notEmpty()
    .withMessage("book id is required")
    .isMongoId()
    .withMessage(" book id not valid"),
    ValidatorMiddleware
]

exports.UpdateElementFromCartValidator = [
    check("id")
    .notEmpty()
    .withMessage(" id  is required ")
    .isMongoId()
    .withMessage("not valid id"),

    check("quantity")
    .notEmpty()
    .withMessage("quantity is required ")
    .isNumeric()
    .withMessage("not valid form for quantity"),

    check('bookId')
    .notEmpty()
    .withMessage("book id is required")
    .isMongoId()
    .withMessage(" book id not valid"),
    ValidatorMiddleware
]

exports.ClearCartValidator = [
    check("id")
    .notEmpty()
    .withMessage(" id  is required ")
    .isMongoId()
    .withMessage("not valid id"),
    ValidatorMiddleware
]

exports.GetCartValidator = [
    check("id")
    .notEmpty()
    .withMessage(" id  is required ")
    .isMongoId()
    .withMessage("not valid id"),
    ValidatorMiddleware
]