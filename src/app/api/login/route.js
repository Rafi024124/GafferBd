import { loginUser } from "@/lib/loginUser";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await loginUser({ email, password });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Remove sensitive fields before sending user back
    const { password: _, ...safeUser } = user;

    return new Response(
      JSON.stringify(safeUser),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
