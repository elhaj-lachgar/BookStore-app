const express = require("express");

const {
  AddToCartService,
  ClearCardService,
  CreateToCartService,
  DeleteCartService,
  UpdateElmentOfCartService,
  GetCardService,
} = require("../services/CartService");

const { AllwodToService, AuthService } = require("../services/AuthService");

const {
  AddElementToCartValidator,
  ClearCartValidator,
  DeleteElementFromCartValidator,
  UpdateElementFromCartValidator,
  GetCartValidator,
} = require("../utils/validator/CartValidator");

const router = express.Router();

router.delete(
  "/clear/:id",
  AuthService,
  AllwodToService("user"),
  ClearCartValidator,
  ClearCardService
);

router.post("/", AuthService, AllwodToService("user"), CreateToCartService);

router
  .route("/:id")
  .post(
    AuthService,
    AllwodToService("user"),
    AddElementToCartValidator,
    AddToCartService
  )
  .put(
    AuthService,
    AllwodToService("user"),
    UpdateElementFromCartValidator,
    UpdateElmentOfCartService
  )
  .delete(
    AuthService,
    AllwodToService("user"),
    DeleteElementFromCartValidator,
    DeleteCartService
  )
  .get(AuthService, AllwodToService("user"), GetCartValidator, GetCardService);



module.exports = router;
