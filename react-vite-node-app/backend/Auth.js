import sql from "./db.js";

async function testConnection() {
    try {
        const result = await sql`SELECT 1`;
        console.log("✅ Database connected!", result);
    } catch (err) {
        console.error("❌ Failed to connect to database:", err);
    }
}

function register() {}

export default testConnection();
