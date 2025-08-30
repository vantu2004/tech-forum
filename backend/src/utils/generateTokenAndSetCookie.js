import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true, // Chỉ cho phép server đọc cookie, JS phía client (document.cookie) không truy cập được → tăng bảo mật.
    secure: process.env.NODE_ENV === "production", // Cookie chỉ được gửi qua HTTPS nếu chạy ở môi trường production.
    sameSite: "strict", // Chỉ gửi cookie khi request đến từ cùng domain → chống CSRF.
    maxAge: 7 * 24 * 60 * 60 * 1000, // Thời gian sống: 7 ngày (tính bằng mili-giây).
  });
};

export default generateTokenAndSetCookie;
