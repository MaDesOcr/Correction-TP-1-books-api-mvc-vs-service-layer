const bookService = require('../services/bookService');

exports.getBooks = async (req, res, next) => {
  try {
    let filter = {};
    if (req.query.isRead === 'true') filter.isRead = true;
    if (req.query.isRead === 'false') filter.isRead = false;

    const books = await bookService.listBooks(filter);
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const book = await bookService.getBook(id);
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const book = await bookService.updateBook(id, req.body);
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await bookService.deleteBook(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
