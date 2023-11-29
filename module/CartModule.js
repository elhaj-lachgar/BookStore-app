const mongoose = require ('mongoose');


const CartSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.ObjectId ,
        ref  : "user" ,
        required : [ true , " user required "]
    },

    books : [
        {
            book : {
                type : mongoose.Schema.ObjectId ,
                ref : "book",
            },
            
            count_book :{
                type : Number ,
                default : 1 ,
            },

            price :  Number ,
            
        }
    ],

    shoppingPrice : Number ,

    taxPrice : Number,

    totalePrice : Number,

},{timestamps : true});




const CartModule = mongoose.model('cart',CartSchema);

module.exports = CartModule ;