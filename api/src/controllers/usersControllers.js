const usersService = require("../services/usersService");

const favoritesService = require("../services/favoritesService");
const Book = require("../models/Book")
const User = require("../models/User")

module.exports = {
    getUsers: async(req,res)=>{
        try {
            const users = await usersService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    
    },

    createUser: async(req,res)=>{
        const {email,password} = req.body;
        try {
            const newUser = await usersService.createUser({email, password});
            res.status(200).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
             res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteUser: async(req,res)=>{
        const {id} = req.params;
        try {            
            const user = await usersService.deleteUser(id)
            res.status(200).json(user)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    },
     addFavorite: async (req, res) => {
        const { userId } = req.params;
        const { bookId } = req.body;
        try {
            const favorites = await usersService.addFavorite(userId, bookId);
            res.status(201).json(favorites);
        } catch (error) {
            console.error('Error adding favorite:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    
    removeFavorite: async (req, res) => {
        const { userId, bookId } = req.params;
        try {
            const favorites = await usersService.removeFavorite(userId, bookId);
            res.status(200).json(favorites);
        } catch (error) {
            console.error('Error removing favorite:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getUserFavorites: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const favoritesWithDetails = [];

        for (const bookId of user.favorites) {
            const book = await Book.findById(bookId);
            if (book) {
                favoritesWithDetails.push(book);
            }
        }
        
            res.status(200).json(favoritesWithDetails);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },


    // getUserFavorites: async (req, res) => {
    //     const { userId } = req.params;
    //     try {
    //         const favorites = await usersService.getUserFavorites(userId);
            
    //         const favoritesWithDetails = [];
            
    //         for (const bookId of favorites) {
    //             const book = await Book.findById(bookId);
    //             favoritesWithDetails.push(book);
    //         }
            
    //         res.status(200).json(favoritesWithDetails);
    //     } catch (error) {
    //         return res.status(500).json({ error: error.message });
    //     }
    // },
}