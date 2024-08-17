import express from "express";
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import postRoutes from './routes/posts.routes.js';
import notificationsRoutes from './routes/notifications.routes.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import cors from 'cors'


dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // secure: true,
    // url: (public_id) => `https://res.cloudinary.com/dawid-kowalski/${public_id}`,
    // format: "jpg",
    // quality: 100
})

const app = express();
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()


app.use(cors({
    origin: ['http://localhost:3000', 'https://thoughts-app-vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.  // Add other headers if needed.
}))

app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/notifications", notificationsRoutes)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/FrontEnd/dist")))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'FrontEnd', 'dist', 'index.html'))
    })
}


// console.log(process.env.MONGO_URL);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.set("strictQuery", false)
    mongoose.connect(process.env.MONGO_URL)
        .then(() => { console.log("Connected to MongoDB") })
        .catch((err) => console.log(err));
})