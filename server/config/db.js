// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Tải các biến môi trường từ file .env

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Dừng ứng dụng nếu không thể kết nối
    }
};

module.exports = connectDB;
