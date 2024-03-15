const booksService = require("../services/booksService")

module.exports = {
    getBooks: async (req,res)=>{
        try {
            const books = await booksService.getBooks()
            res.status(200).json(books)
            
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    },

    getBookById: async(req,res)=>{
        try {
            const {id} = req.params;
            const book = await booksService.getBookById(id)
            res.status(200).json(book)
            
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    },

    getBookByTitle: async(req,res) => { 
        try {
            const {title} = req.body;
            const book = await booksService.findBookByTitle(title);
            res.status(200).json(book)
            
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    },
    getBookByAuthor: async(req,res) => { 
        try {
            const {author} = req.body;
            const book = await booksService.findBookByAuthor(author);
            res.status(200).json(book)
            
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    },

    deleteBook: async(req,res)=>{
        try {
            
            const {id} = req.params;
            const book = await booksService.deleteBook(id)
            res.status(200).json(book)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    },

    updateBook: async(req,res)=>{
        const { id } = req.params;
        const { title, author, year, genre } = req.body;

        try {
            const updatedBook = await booksService.updateBook(id, { title, author, year, genre });
            res.status(200).json(updatedBook);
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    },


    createBook: async(req,res)=>{
        
        const {title,author,year,genre, image} = req.body;
        
        try {
            const newBook = await booksService.createBook({title,author,year,genre, image});
            res.status(200).json(newBook);
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
       },


    markBookAsFavorite: async (req, res) => {
        
        const { id } = req.params;
    
        try {
            const book = await booksService.markBookAsFavorite(id);
            res.status(200).json(book);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    
    getFavoriteBooks: async (req, res) => {
        try {
            const favoriteBooks = await booksService.getFavoriteBooks();
            res.status(200).json(favoriteBooks);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}