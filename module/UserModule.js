const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },

    slugify: {
      type: String,
      required: [true, "slugify is required "],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is must be unique"],
    },

    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },

    password : {
        type : String ,
        required : [true , "password is required"]
    },

    changePasswordAt : Date,
    
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if ( this.password ){
    this.password = await bcrypt.hash( this.password, 12 ); 
    return next(); 
  }
});

UserSchema.pre("init", async function (next) {

  if ( this.password ){
    this.password = await bcrypt.hash( this.password, 12 ); 
    return next(); 
  }
});

const UserModule = mongoose.model("user" , UserSchema );




module.exports = UserModule ;