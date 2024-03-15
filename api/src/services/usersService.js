const User = require("../models/User");

module.exports = {
    getUsers: async ()=>{
        const users = await User.find();
        return users
    },

    createUser: async (user)=>{
        const newUser = await User.create(user);
        return newUser;
    },

    deleteUser: async (id)=>{
        const user = await User.findByIdAndDelete(id);
        return user;
    },
    
    addFavorite: async (userId, bookId) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
    
            if (!user.favorites.includes(bookId)) {
                user.favorites.push(bookId);
                await user.save();
            }
    
            return user.favorites;
        } catch (error) {
            throw new Error('Error adding favorite');
        }
    },
    
     removeFavorite: async (userId, bookId) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
    
            user.favorites = user.favorites.filter(favorite => favorite != bookId);
            await user.save();
    
            return user.favorites;
        } catch (error) {
            throw new Error('Error removing favorite');
        }
    },
    
     getUserFavorites: async (userId) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
    
            return user.favorites;
        } catch (error) {
            throw new Error('Error fetching favorites');
        }
    },

}