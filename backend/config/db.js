import mongoose from "mongoose";

export const connectionDB = async()=>{
    await mongoose.connect('mongodb+srv://sxsun1684:31415926dog@cluster0.xbb8qqe.mongodb.net/food-delivery')
    .then(()=>{
        console.log("DB connected");
    })
}