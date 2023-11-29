const UserModule = require("../module/UserModule");

const asynchandler = require("express-async-handler");

const slugify = require("slugify");

const ErrorHandler = require ('../utils/ErrorHandler');

const { GetElementService } = require('./Factory')


// create user
// per admin
// url api/v1/user
exports.CreateUserService = asynchandler(async (req, res, next) => {
  req.body.slugify = slugify(req.body.name);

  const user = await UserModule.create(req.body);

  const RespObj = user;

  RespObj.password = undefined;

  return res.status(201).json({ message: "creation is done", data: RespObj });
});

// update user
// per admin
// url api/v1/user/:id
exports.UpdateUserService = asynchandler(async (req, res, next) => {
  req.body.slugify = slugify(req.body.name);

  const user = await UserModule.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  
  if ( ! user )
    return next ( new ErrorHandler ("user not found" , 404)) ;

  const RespObj = user;

  RespObj.password = undefined;

  return res.status(201).json({ message: "update is done", data: RespObj });

});


// delete user
// per admin
// url api/v1/user/:id
exports.DeleteUserService = asynchandler ( async ( req , res , next ) => {

    const user = await UserModule.findOneAndDelete({_id});
    
      
    if ( ! user )
    return next ( new ErrorHandler ("user not found" , 404)) ;
    
    return res.status(202).json({message : "delete user"});
})


// get  user by id 
// per admin
// url api/v1/user/:id
exports.GetUserByIdService = asynchandler ( async ( req , res , next ) => {

    const user = await UserModule.findOne({_id : req.params.id});

      
    if ( ! user )
      return next ( new ErrorHandler ("user not found" , 404)) ;

    const RespObj = user;

    RespObj.password = undefined;

    return res.status(201).json({ data : RespObj });
});



// get  users
// per admin
// url api/v1/user
exports.GetUserService = GetElementService(UserModule);
