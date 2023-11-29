const  {validationResult} = require ('express-validator');


const ValidatorMiddleware =  async ( req , res , next  ) => {

    const error = validationResult(req);

    if ( error.isEmpty() )
      return next ();

    res.status(400).json({ errors: error.array() });
}


module.exports = ValidatorMiddleware ;