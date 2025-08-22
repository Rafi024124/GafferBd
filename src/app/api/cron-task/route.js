// src/app/api/cron-task/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Example task: log something, fetch data, update database
    console.log("Cron job executed at:", new Date());

    // If you want, you can fetch or update your database here
    // await someDatabaseFunction();

    return NextResponse.json({ success: true, message: "Cron job executed" });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
