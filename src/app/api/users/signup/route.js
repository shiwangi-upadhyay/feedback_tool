import { connect } from "@/dbConfig/dgConfig";
import User from "@/models/userSchema";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await connect();
    const { username, email, password, isAdmin } = await req.json();

    // Basic validation
    if (!username || !email || !password) {
        return Response.json(
        { error: "Username, email, and password are required." },
        { status: 400 }
        );
    }

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
        return Response.json(
        { error: "Username or email already exists." },
        { status: 409 }
        );
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashed,
        isAdmin: !!isAdmin, // Only set true if specifically provided, otherwise false
    });

    return Response.json({
        success: true,
        user: { username: user.username, email: user.email, isAdmin: user.isAdmin },
    });
}
