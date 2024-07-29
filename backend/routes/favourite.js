const router = require("express").Router();
const User = require("../models/user");
const { authenticationToken } = require("./userauth");



//Add Book to Favourite
router.put("/add-book-to-favourite", authenticationToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book already In Favourite1" });

        }
        await User.findByIdAndUpdate(id, {
            $push: { favourites: bookid }
        });
        return res.status(200).json({ message: "Book Added To fav." });
    } catch (error) {
        res.status(500).json({ message: "Intrenal server Error!" });
    }
});

//Remove book from favourite
router.put("/remove-book-from-favourite", authenticationToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        }
        return res.status(200).json({ message: "Book Removed from Favourites" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

//get Favourite Books Of  a Particular User
router.get("/get-favourite-books", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.json({
            status: "Success",
            data: favouriteBooks,
        });
    } catch (error) {
        res.status(500).json({ message: "An Internal Server Error!" });
    }
});





module.exports = router;