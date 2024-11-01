const express = require("express");
const path = require('path'); 
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friendRoutes");
const messageRoutes = require("./routes/messageRoutes");
const connectDB = require('./config/db'); 
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Kết nối đến MongoDB
connectDB();

// Kết nối đến MongoDB

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/friends", friendRoutes);
app.use("/messages", messageRoutes);
app.use('/files', express.static(path.join(__dirname, 'files')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
