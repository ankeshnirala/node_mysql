const db = require('./../databases/database');

const Book = function(books){
    this.id = books.id;
    this.book_name = books.book_name;
    this.author_fname = books.author_fname;
    this.author_lname = books.author_lname;
    this.pages = books.pages;
    this.price = books.price;
    this.description = books.description;
}

Book.saveBook = (newBook) => {
    const query = `INSERT INTO books SET ?`;
    return db.query(query, newBook);
};

Book.fetchAllBook = () => {
    const query = `SELECT * FROM books`;
    return db.query(query);
};

Book.fetchBookById = (id) => {
    const query = `SELECT * FROM books`;
    return db.query(query, id);
};

Book.updateBookById = (newBook, id) => {
    const query = `UPDATE books SET ? WHERE id = ?`;
    return db.query(query, [newBook, id]);
};

Book.deleteBookById = (id) => {
    const query = `DELETE FROM books WHERE id = ?`;
    return db.query(query, id);
};

module.exports = Book;