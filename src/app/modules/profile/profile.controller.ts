import { Response } from "express";
import { TRequest } from "../../interface/global.interface.js";
import handleAsyncRequest from "../../utils/handleAsyncRequest.js";
import { profileServices } from "./profile.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

const getProfile = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const result = await profileServices.getProfile(req.user?.id as string);
  sendResponse(res, {
    message: "Profile fetched successfully!",
    data: result,
  });
});

const updateProfile = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await profileServices.updateProfile(
      req.user?.id as string,
      req.body
    );
    sendResponse(res, {
      message: "Profile updated successfully!",
      data: result,
    });
  }
);

export const profileController = {
  getProfile,
  updateProfile,
};
