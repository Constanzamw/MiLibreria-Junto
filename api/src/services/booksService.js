const Book = require("../models/Book")

module.exports = {
    getBooks: async ()=>{
        const books = await Book.find();
        return books;
    },
    
    getBookById: async (id)=>{
        const book = await Book.findById(id);
        return book;
    },

    findBookByTitle: async (title)=>{
        const book = await Book.findOne({title});
        return book;
    },
    findBookByAuthor: async (author)=>{
        const book = await Book.find({author});
        return book;
    },

    deleteBook: async (id)=>{
        const book = await Book.findByIdAndDelete(id);
        return book;
    },

    updateBook:async (id, bookData)=>{
        const book = await Book.findByIdAndUpdate(id, bookData, { new: true });
        return book;
    },
    
    createBook: async (book)=>{
        const newBook = await Book.create(book)
        return newBook;

    },

    markBookAsFavorite: async (id) => {
        const book = await Book.findByIdAndUpdate(id, { favorite: true }, { new: true });
        return book;
    },

    getFavoriteBooks: async () => {
        const favoriteBooks = await Book.find({ favorite: true });
        return favoriteBooks;
    }


}