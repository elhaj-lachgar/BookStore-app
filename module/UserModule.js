const mongoose = require("mongoose");

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

  },
  { timestamps: true }
);



const UserModule = mongoose.model("user" , UserSchema );




module.exports = UserModule ;