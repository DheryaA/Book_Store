const express = require("express");
require("dotenv").config();
require("./conn/conn.js");
const user=require("./routes/user.js");
const books=require("./routes/book.js");
const favourite=require("./routes/favourite");
const cart=require("./routes/cart.js");
const order=require("./routes/orders.js");
const cors=require("cors");


const app = express();
app.use(cors());
app.use(express.json());


//routes
app.use("/api/v1",user);
app.use("/api/v1",books);
app.use("/api/v1",favourite);
app.use("/api/v1",cart);
app.use("/api/v1",order);





app.get("/", (req, res) => {
    res.send(`I am port ${process.env.PORT}`)
});

//creating Port 
app.listen(process.env.PORT, () => {
    console.log("Server Started");
});