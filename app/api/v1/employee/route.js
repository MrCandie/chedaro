import Organization from "../../models/organization";
import User from "../../models/user";
import { createLog } from "../../utils/createLog";
import getAuthUser from "../../utils/getAuthUser";
import { hashPin } from "../../utils/hashPassword";
import {
  sendBadRequestResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "../../utils/responses";
// import ShortUniqueId from "short-unique-id";

// const uid = new ShortUniqueId({ length: 10 });

export const POST = async (req) => {
  try {
    const user = await getAuthUser(req);
    if (!user) return sendBadRequestResponse("unauthenticated");

    if (user.userType === "user") return sendBadRequestResponse("unauthorized");

    const { firstName, lastName, email, permissions, password, organization } =
      await req.json();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !permissions ||
      !organization ||
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

    const organizationValid = await Organization.findById(organization);
    if (!organizationValid)
      return sendBadRequestResponse("Invalid organization");

    const hashedPassword = await hashPin(String(password));

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      permissions,
      organization: organization,
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

    if (user.userType !== "admin")
      return sendBadRequestResponse("unauthorized");

    const employees = await User.find({ userType: "employee" })
      .populate("organization", "name")
      .sort({ createdAt: -1 });

    await createLog("Fetched Employees", user.id);

    return sendSuccessResponse("Organizations retrieved", employees);
  } catch (error) {
    return sendServerErrorResponse();
  }
};
