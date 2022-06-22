const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users.route')
const authRoute = require('./routes/auth.route')
const postRoute = require('./routes/posts.route')
const conversationRoute = require('./routes/conversations.route')
const messageRoute = require('./routes/messages.route')
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");

dotenv.config()


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MONGODB');
});

app.use("/images", express.static(path.join(__dirname, "public/images")))

// middleware
app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: false, }));
app.use(morgan("common"));
// app.use(cors());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully.")
    } catch (error) {
        console.error(error);
    }
})


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(8800, () => {
    console.log('Backend server is running!');
})