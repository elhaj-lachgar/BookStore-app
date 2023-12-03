const express = require("express");

const {
  AddToCartService,
  ClearCardService,
  CreateToCartService,
  DeleteCartService,
  UpdateElmentOfCartService,
  GetCardService
} = require("../services/CartService");

const { AllwodToService, AuthService } = require("../services/AuthService");

const {
  AddElementToCartValidator,
  ClearCartValidator,
  DeleteElementFromCartValidator,
  UpdateElementFromCartValidator,
  GetCartValidator
} = require("../utils/validator/CartValidator");


const router = express.Router();






module.exports = router ;