const mongoose=require("mongoose");


const conn=async()=>{
    try {
        await mongoose.connect(process.env.uri);
        console.log("Connected to the DB...")
    } catch (error) {
        console.log(error);
    }

}
conn();
