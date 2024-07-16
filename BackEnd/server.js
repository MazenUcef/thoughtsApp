import express from "express";
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";


dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use("/api/auth", authRoutes)


// console.log(process.env.MONGO_URL);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.set("strictQuery", false)
    mongoose.connect(process.env.MONGO_URL)
        .then(() => { console.log("Connected to MongoDB") })
        .catch((err) => console.log(err));
})