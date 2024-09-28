import dbConnect from "./lib/db";

export async function register() {
  console.log("API Endpoint:", process.env.NEXT_PUBLIC_API_BASE)
  console.log("Connecting to database...");
  try {
    await dbConnect();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
}