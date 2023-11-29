const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({

    author : {
        type : String ,
        required : [ true , "author is required"]
    },

    description : String ,
    image_cover : String ,

    title : {
        type : String ,
        required : [ true , "title is required "]
    },

    name : {
        type : String ,
        required : [ true , "name of book "]
    },


    price : {
        type : Number ,
        required : [ true , "price is required"]
    }

},{timestamps: true });



const BookModule = mongoose.model("book" , BookSchema ) ;


module.exports = BookModule ;