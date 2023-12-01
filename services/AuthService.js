const UserModule = require("../module/UserModule");

const jwt = require("jsonwebtoken");

const slugify = require ('slugify');

const ErrorHandler = require("../utils/ErrorHandler");

const asynchandler = require("express-async-handler");

const bcrypt = require("bcryptjs");

exports.AuthService = asynchandler(async (req, res, next) => {
  if (!req.headers.authorization)
    return next(new ErrorHandler("unauthorization", 403));

  const Reqtoken = req.headers.authorization.split(" ")[1];

  const tokenInfo = jwt.verify(Reqtoken, process.env.SECRET_KEY);


  const user = await UserModule.findOne({ _id: tokenInfo.userId });

  if ( ! user ) return next(new ErrorHandler("unauthorization", 403));


  if (user.changePasswordAt) {
    const dure = Math.floor(user.changePasswordAt.getDate() / 1000);

    if (dure > tokenInfo.iat)
      return next(new ErrorHandler("you change password recently ", 403));

  }


  req.user = user;

  return next();
});

exports.AllwodToService = (...roles) =>
  asynchandler(async (req, res, next) => {
    const isValid = roles.includes(req.user.role);

    if (!isValid) return next(new ErrorHandler("unauthorization", 403));

    return next();
  });

exports.SingInService = asynchandler(async (req, res, next) => {

  const user = await UserModule.findOne({ email: req.body.email });

  if (!user) return next(new ErrorHandler(" user not found ", 404));

  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid) return next(new ErrorHandler("unauthorization", 403));

  const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRED,
  });

  const RespObj = user ;

  RespObj.password = undefined ;

  return res.status(201).json({data : RespObj , token});
});

exports.SingUpService = asynchandler ( async ( req , res , next ) => {

  req.body.slugify = slugify(req.body.name) ;

  const user = await UserModule.create(req.body);

  const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRED,
  });

  const RespObj = user ;

  RespObj.password = undefined ;

  return res.status(201).json({data : RespObj , token});

})