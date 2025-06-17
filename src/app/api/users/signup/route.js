import { connect } from "@/dbConfig/dgConfig";
import User from "@/models/userSchema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connect();
    const { username, email, password, isAdmin } = await req.json();

    if (!username || !email || !password) {
        return NextResponse.json(
            { 
                error: "Username, email, and password are required." 
            },
            { 
                status: 400 
            }
        );
    }

    const existing = await User.findOne({ email });
    if (existing) {
        return NextResponse.json(
            { 
                error: "Username or email already exists." 
            },
            { 
                status: 409 
            }
        );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashed,
        isAdmin: !!isAdmin,
    });

    return NextResponse.json({
        success: true,
        user: { 
            username: user.username, 
            email: user.email, 
            isAdmin: user.isAdmin 
        },
    });
}