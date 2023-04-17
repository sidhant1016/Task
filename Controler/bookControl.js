var db = require("../models");
const Book = db.Book;

const addBook = async (req, res) => {
  try {
    const { title, author, isbn, quantity } = req.body;
    const book = await Book.create({ title, author, isbn, quantity });
    res.status(201).json({ book });
  } catch (error) {
    console.error('Error creating book', error);
    res.status(500).json({ error: 'Error creating book' });
  }
};
const updateBook = async (req, res) => {
  try {
    const { title, author, isbn, quantity } = req.body;
    const book = await Book.findByPk(req.params.id);
    if (book) {
      book.title = title;
      book.author = author;
      book.isbn = isbn;
      book.quantity = quantity;
      await book.save();
      res.status(200).json({ book });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Error updating book', error);
    res.status(500).json({ error: 'Error updating book' });
  }
};


module.exports ={
  addBook,
  updateBook

};
