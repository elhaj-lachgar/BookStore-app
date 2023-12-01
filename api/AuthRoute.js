
const express = require ('express');

const { SingInService , SingUpService} = require ('../services/AuthService');

const { SingInValidator , SingUpValidator } = require ('../utils/validator/AuthValidator')

const router = express.Router();


router
  .post("/sing-in" , SingInValidator , SingInService );

router
  .post("/sing-up" , SingUpValidator , SingUpService);

module.exports = router ;