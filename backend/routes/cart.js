const router = require("express").Router();
const User = require("../models/user");
const { authenticationToken } = require("./userauth");

//put/add book to cart
router.put("/add-to-cart", authenticationToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookincart = userData.cart.includes(bookid);
        if (isBookincart) {
            return res.json({
                status: "Success,",
                message: "Bok is already in the cart"
            });

        }
        await User.findByIdAndUpdate(id, {
            $push: { cart: bookid },
        });

        return res.json({
            status: "Success",
            message: "Book Is Added to The cart"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An Internal Server error Occured!" });
    }
});

//delete/remove  Book from the cart
router.put("/remove-from-cart/:bookid", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id, {
            $pull: { cart: bookid },
        });
        return res.json({
            status: "Success",
            message: "Book removed from cart",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An Internal Server error!" });
    }
});

//get cart of a individual user
router.get("/get-user-cart", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();

        return res.json({
            status: "Success",
            data: cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "an Internal Server error!" });
    }
});






module.exports = router;