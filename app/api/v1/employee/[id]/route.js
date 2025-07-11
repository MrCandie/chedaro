import Log from "@/app/api/models/logs";
import User from "@/app/api/models/user";
import { createLog } from "@/app/api/utils/createLog";
import getAuthUser from "@/app/api/utils/getAuthUser";
import {
  sendBadRequestResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "@/app/api/utils/responses";

export const GET = async (req, context) => {
  try {
    const user = await getAuthUser(req);
    if (!user) return sendBadRequestResponse("unauthenticated");

    if (user.userType !== "admin")
      return sendBadRequestResponse("unauthorized");

    const { id } = await context.params;

    if (!id) return sendBadRequestResponse("Invalid organization ID");

    const employee = await User.findById(id).populate("organization", "name");
    if (!employee) return sendBadRequestResponse("Employee not found");

    const logs = await Log.find({ user: id });

    await createLog("Viewed Employee", user.id);

    return sendSuccessResponse("Employee retrieved", { employee, logs });
  } catch (error) {
    return sendServerErrorResponse();
  }
};

export const DELETE = async (req, context) => {
  try {
    const user = await getAuthUser(req);
    if (!user) return sendBadRequestResponse("unauthenticated");

    if (user.userType !== "admin")
      return sendBadRequestResponse("unauthorized");

    const { id } = await context.params;

    if (!id) return sendBadRequestResponse("Invalid organization ID");

    const employee = await User.findByIdAndDelete(id);
    if (!employee) return sendBadRequestResponse("Employee not found");

    await Log.deleteMany({ user: id });

    await createLog("Deleted Employee", user.id);

    return sendSuccessResponse("Employee deleted");
  } catch (error) {
    return sendServerErrorResponse();
  }
};
