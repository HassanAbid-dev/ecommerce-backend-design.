import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const authennticatedUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const adminOnly = (req, res, next) => {
  console.log("User role:", req.user.role);
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
