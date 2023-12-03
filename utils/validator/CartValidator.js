
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
]

exports.UpdateElementFromCartValidator = [
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
]

exports.ClearCartValidator = [
    check("id")
    .notEmpty()
    .withMessage(" id  is required ")
    .isMongoId()
    .withMessage("not valid id"),
]

exports.GetCartValidator = [
    check("id")
    .notEmpty()
    .withMessage(" id  is required ")
    .isMongoId()
    .withMessage("not valid id"),
]