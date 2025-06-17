import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function signToken(payload) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign(
    payload, 
    JWT_SECRET, 
    { 
      expiresIn: "1h" 
    }
  );
}

export function verifyToken(token) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.verify(token, JWT_SECRET);
}

