
const { check } = require ('express-validator');

const ValidatorMiddleware = require ('../../middleware/ValidatorMiddleware');


exports.SingInValidator = [
    check("email")
    .notEmpty()
    .withMessage(" email is required ")
    .isEmail()
    .withMessage("email not valid"),

    check('password')
    .notEmpty()
    .withMessage("password is required")
    .isLength({max : 16 , min : 8 })
    .withMessage(" password not valid"),

    check("confirmpassword")
    .notEmpty()
    .withMessage("confirmpassword is required")
    .custom ( ( value , {req}) => {

        const isValid = value == req.body.password ;

        if (!isValid)
          throw new Error ("confirm password incorrected");

        return true;
    }),

    ValidatorMiddleware
]


exports.SingUpValidator = [
  check("email")
  .notEmpty()
  .withMessage("email is required")
  .isEmail()
  .withMessage("email is not valid"),

  check("name")
  .notEmpty()
  .withMessage("name is required"),

  check('password')
  .notEmpty()
  .withMessage("password is required")
  .isLength({max : 16 , min : 8 })
  .withMessage(" password not valid"),

  check("confirmpassword")
  .notEmpty()
  .withMessage("confirmpassword is required")
  .custom ( ( value , {req}) => {

      const isValid = value == req.body.password ;

      if (!isValid)
        throw new Error ("confirm password incorrected");

      return true;
  }),

  ValidatorMiddleware
]