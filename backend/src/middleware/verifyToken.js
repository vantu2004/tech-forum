import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      throw new Error("Unauthorized");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error("Unauthorized");
      }

      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
