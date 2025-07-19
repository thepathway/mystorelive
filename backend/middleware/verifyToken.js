// backend\middleware\verifyToken.js
import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { customerNumber, role }
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

