require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server start on ${PORT} port: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();