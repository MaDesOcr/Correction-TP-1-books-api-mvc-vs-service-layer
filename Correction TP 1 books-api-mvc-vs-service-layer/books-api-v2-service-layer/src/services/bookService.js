const bookRepository = require('../repositories/bookRepository');

class BookService {
  async listBooks(filter) {
    const books = await bookRepository.findAll();

    if (filter && typeof filter.isRead === 'boolean') {
      return books.filter(b => b.isRead === filter.isRead);
    }

    return books;
  }

  async getBook(id) {
    const book = await bookRepository.findById(id);
    if (!book) {
      const error = new Error('Book not found');
      error.statusCode = 404;
      throw error;
    }
    return book;
  }

  async createBook(input) {
    if (!input.title || input.title.trim().length < 3) {
      const error = new Error('Title must be at least 3 characters');
      error.statusCode = 400;
      throw error;
    }
    if (!input.author || input.author.trim().length < 3) {
      const error = new Error('Author must be at least 3 characters');
      error.statusCode = 400;
      throw error;
    }
    return bookRepository.create({
      title: input.title.trim(),
      author: input.author.trim()
    });
  }

  async updateBook(id, input) {
    const book = await bookRepository.update(id, input);
    if (!book) {
      const error = new Error('Book not found');
      error.statusCode = 404;
      throw error;
    }
    return book;
  }

  async deleteBook(id) {
    const ok = await bookRepository.delete(id);
    if (!ok) {
      const error = new Error('Book not found');
      error.statusCode = 404;
      throw error;
    }
  }
}

module.exports = new BookService();
