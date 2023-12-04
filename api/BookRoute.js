const express = require("express");

const {
  CreateBookService,
  DeleteBookService,
  GetBookByIdService,
  GetBookService,
  UpdateBookService,
} = require("../services/BookService");

const { AllwodToService, AuthService } = require("../services/AuthService");

const {
  CreateBookValidator,
  DeleteBookValidator,
  GetBookValidator,
  UpdateBookValidator,
} = require("../utils/validator/BookValidator");

const router = express.Router();

router
  .route("/")
  .post(
    AuthService,
    AllwodToService("admin"),
    CreateBookValidator,
    CreateBookService
  )
  .get(AuthService, AllwodToService("user", "admin"), GetBookService);

router
  .route("/:id")
  .put(
    AuthService,
    AllwodToService("admin"),
    UpdateBookValidator,
    UpdateBookService
  )
  .delete(
    AuthService,
    AllwodToService("admin"),
    DeleteBookValidator,
    DeleteBookService
  )
  .get(
    AuthService,
    AllwodToService("admin"),
    GetBookValidator,
    GetBookByIdService
  );

module.exports = router;
