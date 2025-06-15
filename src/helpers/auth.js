import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Function to sign a JWT token with the given payload (e.g., user/admin info)
export function signToken(payload) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}
// Function to verify a JWT token and return the decoded payload
export function verifyToken(token) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.verify(token, JWT_SECRET);
}

