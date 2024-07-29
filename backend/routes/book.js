const router = require("express").Router();
const User = require("../models/user.js");
const Book = require("../models/book.js");
const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./userauth.js");


//Admin Api

//add book 
router.post("/add-book", authenticationToken, async (req, res) => {
    try {

        const { id } = req.headers;
        const user = await User.findById(id);

        if (user.role !== "admin") {
            return res.status(400).json({ message: "You do not have access admin right reserved!" })
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });

        await book.save();
        res.status(200).json({ message: "Book Added Successfully" })
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Internal server Error!" })
    }
});

//update book
router.put("/update-book", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        return res.status(200).json({
            message: "Book Updated Successfully!"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error has Occured!" });
    }
});

//delete book 
router.delete("/delete-book", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({
            message: "Book Deleted Successfully!"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An Error Occured!" });
    }
});




//Public Api

//get all Books (**I have delete middleware from here remember)
router.get("/get-all-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.status(200).json({
            status: "success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An Error Occured!" });
    }
});

//get recently added books Limit -4
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.json({
            status: "Success",
            data: books
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An Error Occured!" })
    }
});

//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
});


module.exports = router;