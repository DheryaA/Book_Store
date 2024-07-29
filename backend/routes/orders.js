const { authenticationToken } = require("./userauth");
const Book = require("../models/book.js");
const Order = require("../models/order.js");
const User = require("../models/user.js");
const router = require("express").Router();

//place Order
router.post("/place-order", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();

            //saving orders in user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
            });

            //clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }
        return res.json({
            status: "Success",
            message: "Order Placed Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An Internal error!" });
    }
});

//get oredr History of a particular user
router.get("/get-order-history", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        });
        const orderData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: orderData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

//get-all-orders ---admin
router.get("/get-all-orders", authenticationToken, async (req, res) => {
    try {
        const userData = await Order.find().populate({
            path: "book",
        }).populate({
            path: "user",
        }).sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: userData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An Internal Server Error!" });
    }
});

//update order ---admin
router.put("/update-status/:id", authenticationToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, {
            status: req.body.status
        });
        return res.json({
            status: "Success",
            mesaage: "Status updated Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;