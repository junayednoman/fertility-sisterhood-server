import { Response } from "express";
import { TRequest } from "../../interface/global.interface.js";
import handleAsyncRequest from "../../utils/handleAsyncRequest.js";
import pick from "../../utils/pick.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { medicationServices } from "./medication.service.js";

const create = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await medicationServices.create(req.user!.id, req.body);
  sendResponse(res, {
    status: 201,
    message: "Medication created successfully!",
    data,
  });
});
const getMy = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await medicationServices.getMy(
    req.user!.id,
    pick(req.query, ["page", "limit"])
  );
  sendResponse(res, { message: "Medications fetched successfully!", data });
});
const getSingle = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await medicationServices.getSingle(
    req.user!.id,
    req.params.id as string
  );
  sendResponse(res, { message: "Medication fetched successfully!", data });
});
export const medicationController = { create, getMy, getSingle };
