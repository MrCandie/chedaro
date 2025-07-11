import User from "@/app/api/models/user";
import { createLog } from "@/app/api/utils/createLog";
import getAuthUser from "@/app/api/utils/getAuthUser";
import { hashPin } from "@/app/api/utils/hashPassword";
import {
  sendBadRequestResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "@/app/api/utils/responses";

export const POST = async (req) => {
  try {
    const user = await getAuthUser(req);
    if (!user) return sendBadRequestResponse("unauthenticated");

    if (user.userType !== "user") return sendBadRequestResponse("unauthorized");

    if (!user.organization)
      return sendBadRequestResponse("User does not belong to any organization");

    const { firstName, lastName, email, permissions, password } =
      await req.json();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !permissions ||
      permissions.length === 0
    )
      return sendBadRequestResponse("Kindly fill all required fields");

    const userExists = await User.find({ email });
    if (userExists.length !== 0)
      return sendBadRequestResponse("User with this email exists already");

    if (password.length < 8)
      return sendBadRequestResponse(
        "Password cannot be less than 8 characters"
      );

    const hashedPassword = await hashPin(String(password));

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      permissions,
      organization: user.organization,
      userType: "employee",
    });

    await createLog("Created Employee", user.id);

    return sendSuccessResponse("Employee created");
  } catch (error) {
    console.error(error);
    return sendServerErrorResponse();
  }
};

export const GET = async (req) => {
  try {
    const user = await getAuthUser(req);

    if (!user) return sendBadRequestResponse("unauthenticated");

    if (user.userType !== "user") return sendBadRequestResponse("unauthorized");

    if (!user.organization)
      return sendSuccessResponse("Employees retrieved", []);

    const employees = await User.find({ organization: user.organization });

    await createLog("Fetched Employee", user.id);

    return sendSuccessResponse("Employees retrieved", employees);
  } catch (error) {
    console.error(error);
    return sendServerErrorResponse();
  }
};
