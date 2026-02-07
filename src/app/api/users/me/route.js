import { NextResponse } from "next/server";
import { verifyToken } from "@/helpers/auth";

export async function GET(req) {
    try {
        // Get token from cookies
        const token = req.cookies.get("token")?.value || "";

        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Verify the token using your existing helper
        const decodedToken = verifyToken(token);

        // Return the user data stored in the token payload
        return NextResponse.json({
            success: true,
            user: {
                name: decodedToken.username, // Using username as name
                email: decodedToken.email,
            }
        });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 500 });
    }
}