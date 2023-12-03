const express = require("express");

const {
  CreateUserService,
  DeleteUserService,
  GetUserByIdService,
  GetUserService,
  UpdateUserService,
  LogAdminService
} = require("../services/UserServices");

const {
  CreateUserValidator,
  DeleteUserValidator,
  GetUserValidator,
  UpdateUserValidator,
  LogAdminValidator
} = require("../utils/validator/UserValidator");

const { AllwodToService, AuthService } = require("../services/AuthService");

const router = express.Router();

router
  .route("/")
  .post(
    AuthService,
    AllwodToService("admin"),
    CreateUserValidator,
    CreateUserService
  )
  .get(AuthService, AllwodToService("admin"), GetUserService);

router
  .route("/:id")
  .put(
    AuthService,
    AllwodToService("admin"),
    UpdateUserValidator,
    UpdateUserService
  )
  .get(
    AuthService,
    AllwodToService("admin"),
    GetUserValidator,
    GetUserByIdService
  )
  .delete(
    AuthService,
    AllwodToService("admin"),
    DeleteUserValidator,
    DeleteUserService
  );

  router.post('/admin' , LogAdminValidator ,LogAdminService)

module.exports = router;
