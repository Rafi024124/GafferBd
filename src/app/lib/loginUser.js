import bcrypt from "bcryptjs";
import dbConnect from "./dbConnect";

export async function loginUser({ email, password }) {
  const usersCollection = await dbConnect("users");
  const user = await usersCollection.findOne({ email });
  if (!user || !user.password) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  // Safe id conversion
  const id =
    user._id && typeof user._id === "object" && user._id.toString
      ? user._id.toString()
      : user._id || user.id;

  return {
    id,
    name: user.name || email, // fallback to email if name is missing
    email: user.email,
    image: user.image || null,
  };
}
