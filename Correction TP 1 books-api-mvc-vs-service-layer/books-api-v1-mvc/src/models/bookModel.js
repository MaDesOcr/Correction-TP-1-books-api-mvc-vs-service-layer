let books = [];
let currentId = 1;

class BookModel {
  static findAll() {
    return books;
  }

  static findById(id) {
    return books.find((b) => b.id === id) || null;
  }

  static create(data) {
    const newBook = {
      id: currentId++,
      title: data.title,
      author: data.author,
      isRead: false,
    };
    books.push(newBook);
    return newBook;
  }

  static update(id, data) {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return null;
    books[index] = { ...books[index], ...data };
    return books[index];
  }

  static delete(id) {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
  }
}

module.exports = BookModel;
