const User = require("../models/User");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (userId) => {
  const payload = { userId };
  return jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });
};

const register = async (req, res) => {
  const { name, email, password, image } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image,
    });

    await newUser.save();
    res.status(200).json({ message: "Người dùng đã đăng ký thành công" });
  } catch (err) {
    console.log("Lỗi khi đăng ký người dùng", err);
    res.status(500).json({ message: "Lỗi khi đăng ký người dùng!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ message: "Email và mật khẩu là bắt buộc" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Thông tin đăng nhập không đúng" });
    }

    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    console.log("Lỗi đăng nhập", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

const checkLoginStatus = async (req, res) => {
  const loggedInUserId = req.params.userId;
  if (!loggedInUserId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const users = await User.find({ _id: { $ne: loggedInUserId } });;
    res.status(200).json(users);
  } catch (err) {
    console.log("Lỗi khi truy xuất danh sách người dùng", err);
    res.status(500).json({ message: "Lỗi khi truy xuất danh sách người dùng" });
  }
};

const checkInfomation = async (req, res) => {
  const loggedInUserId = req.params.userId;
  if (!loggedInUserId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findById(loggedInUserId);
    res.status(200).json(user);
  } catch (err) {
    console.log("L wrestlers khi truy xuuckland ngerdem", err);
    res.status(500).json({ message: "Lỗi khi truy xuất danh sách người dùng" });
  }
};

module.exports = { register, login, checkLoginStatus, checkInfomation };
