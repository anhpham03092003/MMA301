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

  // Kiểm tra dữ liệu đầu vào
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Vui lòng cung cấp đủ tên, email và mật khẩu" });
  }

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    // Tạo mật khẩu băm
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo người dùng mới
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: image || "", // Đảm bảo trường image có giá trị mặc định nếu không có
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    res.status(201).json({ message: "Người dùng đã đăng ký thành công" });
  } catch (err) {
    console.error("Lỗi đăng ký:", err);

    // Xử lý lỗi trùng lặp email
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    res.status(500).json({ message: "Lỗi máy chủ" });
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

const getProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log("Lỗi khi truy xuất danh sách người dùng", err);
    res.status(500).json({ message: "Lỗi khi truy xuất danh sách người dùng" });
  }
}
const editProfile = async (req, res) => {
  const { userId } = req.params;
  const { name, email, image } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.image = image;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.log("L wrestlers khi truy xuất danh sách người dùng", err);
    res.status(500).json({ message: "Lỗi khi truy xuất danh sách người dùng" });
  }
};


const changePassword = async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.log("L wrestlers khi truy xuất danh sách người dùng", err);
    res.status(500).json({ message: "Lỗi khi truy xuất danh sách người dùng" });
  }
};

module.exports = { register, login, checkLoginStatus, checkInfomation,getProfile, editProfile, changePassword };
