import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const verifyToken = async (req, res, next) => {
  // read token from req
  let token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Please login" });
  }

  // verify token
  let decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  // forward req
  req.user = decodedToken;
  next();
};
