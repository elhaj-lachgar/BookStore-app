const asynchandler = require("express-async-handler");

const ErrorHandler = require("../utils/ErrorHandler");

const BookModule = require("../module/BookModule");

const { GetElementService } = require("./Factory");



// create book
// per admin
// url api/v1/book
exports.CreateBookService = asynchandler(async (req, res, next) => {
  const book = await BookModule.create(req.body);

  return res.status(201).json({ data: book, message: "creation is donne" });
});

// update book
// per admin
// url api/v1/book/:id
exports.UpdateBookService = asynchandler(async (req, res, next) => {
  const book = await BookModule.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  if (!book) return next(new ErrorHandler("book is not found", 404));

  return res.status(202).json({ data: book });
});

// delete book
// per admin
// url api/v1/book/:id
exports.DeleteBookService = asynchandler(async (req, res, next) => {
  const book = await BookModule.findOneAndDelete({ _id: req.params.id });

  if (!book) return next(new ErrorHandler("book not found", 404));

  return res.status(202).json({ message: "delete is donne " });
});

// get book by id
// per admin
// url api/v1/book/:id
exports.GetBookByIdService = asynchandler(async (req, res, next) => {
  const book = await BookModule.findOne({ _id: req.params.id });

  if (!book) return next(new ErrorHandler("book is not found", 404));

  return res.status(201).json({ data: book });
});

// get book
// per admin
// url api/v1/book
exports.GetBookService = GetElementService(BookModule);
