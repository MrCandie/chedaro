import User from "@/app/api/models/user";
import { createLog } from "@/app/api/utils/createLog";
import { createToken } from "@/app/api/utils/jwt";
import connectDb from "@/app/api/utils/mongoose";
import {
  sendBadRequestResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "@/app/api/utils/responses";
import { verifyPassword } from "@/app/api/utils/verify-password";
import { cookies } from "next/headers";
import validator from "validator";

export const POST = async (req) => {
  try {
    await connectDb();
    const { email, password } = await req.json();

    if (!email || !password)
      return sendBadRequestResponse("Email and Password are required!");

    if (!validator.isEmail(email))
      return sendBadRequestResponse("Invalid email format");

    const user = await User.findOne({ email }).select("+password");

    if (!user) return sendBadRequestResponse(`Invalid email provided`);

    const passwordValid = await verifyPassword(String(password), user.password);

    if (!passwordValid)
      return sendBadRequestResponse("Login details incorrect");

    const token = await createToken(user.id, "user");
    const cookieStore = await cookies();

    cookieStore.set("authToken", token);
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("Authorization", token);

    user.updatedAt = new Date();
    user.lastLogin = new Date();

    await user.save();

    await createLog("Logged in", user.id);

    user.password = undefined;

    return sendSuccessResponse("Login successful", user);
  } catch (error) {
    console.log(error);
    return sendServerErrorResponse();
  }
};
