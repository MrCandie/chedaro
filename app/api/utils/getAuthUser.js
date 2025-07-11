import User from "../models/user";
import connectDb from "./mongoose";
import { sendServerErrorResponse } from "./responses";

async function getAuthUser(req) {
  try {
    await connectDb();
    const userId = req.headers.get("user");

    if (!userId) return null;

    const user = await User.findById(userId);

    if (!user) return null;
    return user;
  } catch (error) {
    return sendServerErrorResponse(req, {}, "authentication issue");
  }
}

export default getAuthUser;
