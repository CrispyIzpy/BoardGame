import argon2 from "argon2";
import sql from "./db.js";

async function testConnection() {
    try {
        const result = await sql`SELECT 1`;
        console.log("✅ Database connected!", result);
    } catch (err) {
        console.error("❌ Failed to connect to database:", err);
    }
}

export async function register(
    email = "",
    password = "",
    confirmPassword = "",
    username = ""
) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Not a valid Email";
    }
    if (password.trim().length === 0) {
        return "Please enter password";
    }
    if (password !== confirmPassword) {
        return "Passwords not matching";
    }
    if (username.length < 3) {
        return "Username must be at least 3 characters long";
    }
    try {
        const hashedPassword = await argon2.hash(password);

        const result = await sql`
        INSERT INTO users (username, email, password_hash)
        VALUES (${username}, ${email}, ${hashedPassword})
        `;

        return "Success";
    } catch (err) {
        console.error(err);
        if (err.code === "23505") {
            // check if username/email exists already
            if (err.constraint_name === "users_email_key") {
                return "Email already in use";
            } else if (err.constraint_name === "users_username_key") {
                return "Username already in use";
            } else {
                return "User already exists";
            }
        } else {
            console.error(err);
            return "Registration failed, try again later or contact support";
        }
    }
}

export async function login(email = "", password = "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Not a valid Email";
    }
    if (password.trim().length === 0) {
        return "Please enter password";
    }

    try {
        const result = await sql`
        SELECT * FROM users WHERE email = ${email} LIMIT 100
        `;

        if (result.length === 0) {
            return "User not found";
        }
        const user = result[0];
        console.log(result);
        const isValid = await argon2.verify(user.password_hash, password);
        if (isValid) {
            return "Success";
        } else {
            return "Wrong password or username";
        }
    } catch (err) {
        console.error(err);
        return "User not found";
    }
}
