

import dbConnect, { collectionNamesObj } from "@/app/lib/dbConnect";
import { hash } from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Missing email or password" }), { status: 400 });
  }

  try {
    const usersCollection = await dbConnect(collectionNamesObj.usersCollection);

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await hash(password, 10);
    const result = await usersCollection.insertOne({ email, password: hashedPassword });

    return new Response(JSON.stringify({ success: true, id: result.insertedId }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
