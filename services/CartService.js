const CartModule = require("../module/CartModule");

const asynchandler = require("express-async-handler");

const ErrorHandler = require("express-async-handler");

const BookModule = require("../module/BookModule");




// create cart
// per user
// url api/v1/cart
exports.CreateToCartService = asynchandler(async (req, res, next) => {

  req.body.user = req.user._id ;

  const cart = await CartModule.create(req.body);

  return res.status(201).json({ data: cart });
});

// add book to card
// per user
// url api/v1/cart/:id
exports.AddToCartService = asynchandler(async (req, res, next) => {
  const cart = await CartModule.findOne({ _id: req.params.id });

  if (!cart) return next(new ErrorHandler("cart not found", 404));

  const book = await BookModule.findOne({ _id: req.body.bookId });

  if (!book) return next(new ErrorHandler("book not found", 404));

  const index = cart.books.findIndex((ele) => {
    return ele.book === req.body.bookId;
  });

  if (index <= -1) {
    cart.books.push({
      book: req.body.bookId,
      count_book: req.body.quantity,
      price: book.price,
    });
  }

  cart.books[index].count_book =
    cart.books[index].count_book + req.body.quantity;

  cart.shoppingPrice = parseFloat(process.env.SHOPE);

  cart.taxPrice = parseFloat(process.env.TAX);

  let totalePrice;

  cart.books.forEach((element) => {
    totalePrice += element.price * element.count_book;
  });

  totalePrice += cart.shoppingPrice + cart.taxPrice;

  cart.totalePrice = totalePrice;

  await cart.save();

  return res.status(201).json({ data: cart });
});

// delete element form  card
// per user
// url api/v1/cart/:id
exports.DeleteCartService = asynchandler(async (req, res, next) => {
  const cart = await CartModule.findOne({ _id: req.params.id });

  if (!cart) return next(new ErrorHandler("cart not found", 404));

  const book = await BookModule.findOne({ _id: req.body.bookId });

  if (!book) return next(new ErrorHandler("book not found", 404));

  const index = cart.books.findIndex((ele) => {
    return ele.book === req.body.bookId;
  });

  if (index <= -1) return next(new ErrorHandler("book not found in cart"));

  const currentPrice = cart.books[index].price ;

  const currentCountBook = cart.books[index].count_book ;

  cart.totalePrice = cart.totalePrice - currentCountBook * currentPrice ; 

  cart.books.splice(index, 1);

  await cart.save();

  return res
    .status(202)
    .json({ message: "book is removed from card ", data: cart });
});

// update element in card
// per user
// url api/v1/cart/:id
exports.UpdateElmentOfCartService = asynchandler(async (req, res, next) => {
  const cart = await CartModule.findOne({ _id: req.params.id });

  if (!cart) return next(new ErrorHandler("cart not found", 404));

  const book = await BookModule.findOne({ _id: req.body.bookId });

  if (!book) return next(new ErrorHandler("book not found", 404));

  const index = cart.books.findIndex((ele) => {
    return ele.book.toJSON() == req.body.bookId;
  });

  if (index <= -1) return next(new ErrorHandler("book not found in cart", 404));

  const count_book = req.body.count_book;

  cart.totalePrice =
    cart.totalePrice +
    count_book * cart.books[index].price -
    cart.books[index].price * cart.books[index].count_book;

  cart.books[index].count_book = count_book;

  cart.save();

  return res.status(202).json({ data: cart });
});




// clear card
// per user
// url api/v1/cart/:id
exports.ClearCardService = asynchandler ( async ( req , res , next ) => {

    const cart = await CartModule.findOne({ _id : req.params.id });

    if ( ! cart )
      return next ( new ErrorHandler (" cart not found "));

    cart.books.splice(0 , cart.books.length ) ;

    cart.totalePrice = 0 ;

    cart.shoppingPrice = 0 ;

    cart.taxPrice =  0 ;

    await cart.save();


    return res.status(201).json({ data : cart })
})