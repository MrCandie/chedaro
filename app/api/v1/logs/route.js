import Log from "../../models/logs";
import getAuthUser from "../../utils/getAuthUser";
import {
  sendBadRequestResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "../../utils/responses";

export const GET = async (req) => {
  try {
    const user = await getAuthUser(req);
    if (!user) return sendBadRequestResponse("unauthenticated");

    if (user.userType !== "admin")
      return sendBadRequestResponse("unauthorized");

    const logs = await Log.find()
      .populate("user", "firstName lastName")
      .sort({ createdAt: -1 });

    return sendSuccessResponse("Logss retrieved", logs);
  } catch (error) {
    return sendServerErrorResponse();
  }
};
