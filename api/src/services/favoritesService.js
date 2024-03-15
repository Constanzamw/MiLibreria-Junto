const Favorite = require("../models/Favorite");
const User = require("../models/User");

module.exports = {
    getFavorites: async ()=>{
        try {
            const favorites = await Favorite.find();
            return favorites;
        } catch (error) {
            throw error;
        }
    },

    deleteFavorites: async (id)=>{
        const fav = await Favorite.findByIdAndDelete(id);
        return fav;
    },

    updateFavorites: async (userId, bookId, action) => {
        try {
            let message = "";
            if (action === "add") {
                await Favorite.create({ userId, bookId });
                message = "Book added to favorites";
                await User.findByIdAndUpdate(userId, { $push: { favorites: bookId } });
            } else if (action === "remove") {
                await Favorite.findOneAndDelete({ userId, bookId });
                message = "Book removed from favorites";
                await User.findByIdAndUpdate(userId, { $pull: { favorites: bookId } });
            } else {
                throw new Error("Invalid action");
            }
            return { success: true, message };
        } catch (error) {
            throw error;
        }
    }
}