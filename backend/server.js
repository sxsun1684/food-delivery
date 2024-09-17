import express from "express";
import cors from "cors";
import { connectionDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRouter.js";
import 'dotenv/config'

const app = express ();
const port = 4000;


// middleware
app.use (express.json ());
app.use (cors ());

//connection with database
connectionDB();
//API endpoint
app.use("/api/food",foodRouter)

app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)

app.get ('/', (req, res) => {
    res.send ('GET request to the homepage, API working');
});

app.listen(port,()=>{
    console.log (`sever started:${port}`);
})
//mongodb+srv://sxsun1684:31415926dog@cluster0.zwaaygv.mongodb.net/?