import { connect } from "@/dbConfig/dgConfig";
import User from "@/models/userSchema";
import bcrypt from "bcryptjs";
import { signToken } from "@/helpers/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connect();
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

  // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

  // Include isAdmin in JWT
    const token = signToken({
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    });

  // Set token as HTTP-only cookie
    const response = NextResponse.json({
        success: true,
        user: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        },
    });

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
}