import User from "@/app/api/models/user";
import { createLog } from "@/app/api/utils/createLog";
import getAuthUser from "@/app/api/utils/getAuthUser";
import {
  sendBadRequestResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "@/app/api/utils/responses";

export const PATCH = async (req, context) => {
  try {
    const user = await getAuthUser(req);
    if (!user) return sendBadRequestResponse("unauthenticated");

    if (user.userType !== "admin")
      return sendBadRequestResponse("unauthorized");

    const { id } = await context.params;

    if (!id) return sendBadRequestResponse("Invalid organization ID");

    const { permissions } = await req.json();
    if (!permissions || permissions.length === 0)
      return sendBadRequestResponse("Permissions is required");

    const employee = await User.findById(id);
    if (!employee) return sendBadRequestResponse("Employee not found");

    employee.permissions = permissions;
    await employee.save();

    await createLog("Updated Employee Permissions", user.id);

    return sendSuccessResponse("Employee permission updated");
  } catch (error) {
    return sendServerErrorResponse();
  }
};
