import connectDb from "@/app/api/utils/mongoose";
import validator from "validator";
import {
  sendBadRequestResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "@/app/api/utils/responses";
import User from "@/app/api/models/user";
import { hashPin } from "@/app/api/utils/hashPassword";
import { createToken } from "@/app/api/utils/jwt";
import { cookies } from "next/headers";

export const POST = async (req) => {
  try {
    await connectDb();

    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password)
      return sendBadRequestResponse("Kindly fill out all fields!");

    if (!validator.isEmail(email))
      return sendBadRequestResponse("Invalid email format");

    if (password.length < 8)
      return sendBadRequestResponse(
        "Password cannot be less than 8 characters"
      );

    const userExists = await User.findOne({ email });
    if (userExists)
      return sendBadRequestResponse(
        "User with this email address exists already"
      );

    const hashedPassword = await hashPin(String(password));
    const data = {
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
    };

    const user = await User.create(data);

    const token = await createToken(user.id, "user");
    const cookieStore = await cookies();
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("Authorization", token);

    cookieStore.set("authToken", token);

    user.password = undefined;

    return sendSuccessResponse("Sign up successful", { user, token });
  } catch (error) {
    console.error(error);
    return sendServerErrorResponse();
  }
};
