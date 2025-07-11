import Organization from "../../models/organization";
import User from "../../models/user";
import { createLog } from "../../utils/createLog";
import getAuthUser from "../../utils/getAuthUser";
import {
  sendBadRequestResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "../../utils/responses";

export const POST = async (req) => {
  try {
    const user = await getAuthUser(req);
    if (!user) return sendBadRequestResponse("unauthenticated");

    if (user.userType !== "admin")
      return sendBadRequestResponse("unauthorized");

    const { name } = await req.json();
    if (!name) return sendBadRequestResponse("Organization name is required");

    await Organization.create({
      name,
      createdBy: user.id,
    });

    await createLog("Created Organization" + name, user.id);

    return sendSuccessResponse("Organization created");
  } catch (error) {
    return sendServerErrorResponse();
  }
};

export const GET = async (req) => {
  try {
    const user = await getAuthUser(req);
    if (!user) return sendBadRequestResponse("unauthenticated");

    if (user.userType !== "admin")
      return sendBadRequestResponse("unauthorized");

    const organizations = await Organization.find()
      .populate("employees", "firstName lastName email")
      .sort({ createdAt: -1 });

    const employees = await User.find({ userType: "employee" });
    const administrators = await User.find({ userType: "user" });

    const totalOrganizations = organizations.length;

    await createLog("Fetched Organizations", user.id);

    return sendSuccessResponse("Organizations retrieved", {
      totalOrganizations,
      totalEmployees: employees.length,
      totalAdministrators: administrators.length,
      organizations,
    });
  } catch (error) {
    return sendServerErrorResponse();
  }
};
