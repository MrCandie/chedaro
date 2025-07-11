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

    return sendSuccessResponse("Profile retrieved", user);
  } catch (error) {
    return sendServerErrorResponse();
  }
};
