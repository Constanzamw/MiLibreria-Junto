const { Router } = require("express");
const booksControllers = require("../controllers/booksControllers")
const usersControllers = require("../controllers/usersControllers")
const favoritesControllers = require("../controllers/favoritesControllers")
const router = Router()

//users
router.get("/users", usersControllers.getUsers);
router.post("/users", usersControllers.createUser)
router.delete("/users/:id", usersControllers.deleteUser);
router.get("/users/:userId/favorites", usersControllers.getUserFavorites);
router.post("/users/:userId/favorites", usersControllers.addFavorite);
router.delete("/users/:userId/favorites/:bookId", usersControllers.removeFavorite);

//books
router.get("/books", booksControllers.getBooks)
router.get("/books/title", booksControllers.getBookByTitle)
router.get("/books/author", booksControllers.getBookByAuthor)
router.post("/books", booksControllers.createBook)
router.delete("/books/:id", booksControllers.deleteBook)
router.put("/books/:id", booksControllers.updateBook);
router.get("/books/:id", booksControllers.getBookById)

//favorites
router.get("/favorites", favoritesControllers.getFavorites);
router.post('/favorites', favoritesControllers.updateFavorites);
router.delete("/favorites/:id", favoritesControllers.deleteFavorites)

module.exports = router;