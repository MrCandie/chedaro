import Log from "@/app/api/models/logs";
import getAuthUser from "@/app/api/utils/getAuthUser";
import {
  sendBadRequestResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "@/app/api/utils/responses";

export const GET = async (req) => {
  try {
    const user = await getAuthUser(req);

    if (!user) return sendBadRequestResponse("unauthenticated");

    if (user.userType !== "user") return sendBadRequestResponse("unauthorized");

    if (!user.organization)
      return sendSuccessResponse("No organization found", []);

    const logs = await Log.find().sort({ createdAt: -1 }).populate({
      path: "user",
      select: "firstName lastName organization",
    });

    const orgLogs = logs.filter(
      (log) =>
        log.user?.organization?.toString() === user.organization.toString()
    );

    return sendSuccessResponse("Logs retrieved", orgLogs);
  } catch (error) {
    console.error("LOG FETCH ERROR:", error);
    return sendServerErrorResponse();
  }
};
