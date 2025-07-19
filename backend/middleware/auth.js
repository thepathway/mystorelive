// backend\middleware\auth.js
import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export function isAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
}
