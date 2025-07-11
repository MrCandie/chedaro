import Organization from "@/app/api/models/organization";
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

    const organization = await Organization.findById(id).populate(
      "employees",
      "firstName lastName email"
    );
    if (!organization) return sendBadRequestResponse("Organization not found");

    return sendSuccessResponse("Organization retrieved", organization);
  } catch (error) {
    return sendServerErrorResponse();
  }
};
