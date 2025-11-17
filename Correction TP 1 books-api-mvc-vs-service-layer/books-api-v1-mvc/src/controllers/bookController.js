const BookModel = require('../models/bookModel');

exports.getBooks = (req, res, next) => {
  try {
    const books = BookModel.findAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.getBookById = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const book = BookModel.findById(id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.createBook = (req, res, next) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }

    const book = BookModel.create({ title, author });
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

exports.updateBook = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, author, isRead } = req.body;

    const book = BookModel.update(id, { title, author, isRead });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const ok = BookModel.delete(id);
    if (!ok) return res.status(404).json({ error: 'Book not found' });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
