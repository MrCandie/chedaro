import User from "../../models/user";
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

    const updatedUser = await User.findById(user.id).populate(
      "organization",
      "name"
    );

    return sendSuccessResponse("Profile retrieved", updatedUser);
  } catch (error) {
    return sendServerErrorResponse();
  }
};
