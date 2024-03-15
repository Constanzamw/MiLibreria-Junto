const favoritesService = require("../services/favoritesService")
const User = require("../models/User");


module.exports = {
    getFavorites: async(req,res)=>{
        try {
            const favorites = await favoritesService.getFavorites()
             res.status(200).json(favorites)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        
        }
    },


    deleteFavorites: async(req,res)=>{
        try {
            
            const {id} = req.params;
            const fav = await favoritesService.deleteFavorites(id)
            res.status(200).json(fav)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    },

    updateFavorites: async(req, res)=>{
        const { userId, bookId, action } = req.body;
        try {
            const response = await favoritesService.updateFavorites(userId, bookId, action);
            res.status(200).json(response);
            
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
            
    },
}

// module.exports ={
//     getFavorites: async(req,res)=>{
//         try {
//             const favorites = await favoritesService.getFavorites()
//             res.status(200).json(favorites)
//         } catch (error) {
//             return res.status(404).json({ error: error.message })

//         }
//     },

//     updateFavorites: async(req, res)=>{
//         const { userId, bookId, action } = req.body;
//         try {
//             const response = await favoritesService.updateFavorites(userId, bookId, action);
//             res.status(200).json(response);
//         } catch (error) {
//             return res.status(500).json({ error: error.message });
//         }
    
//     },
// }