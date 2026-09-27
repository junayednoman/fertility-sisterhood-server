import { Response } from "express";
import { TRequest } from "../../interface/global.interface.js";
import handleAsyncRequest from "../../utils/handleAsyncRequest.js";
import pick from "../../utils/pick.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { symptomServices } from "./symptom.service.js";

const create = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await symptomServices.create(req.user!.id, req.body);
  sendResponse(res, {
    status: 201,
    message: "Symptom created successfully!",
    data,
  });
});
const getMy = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await symptomServices.getMy(
    req.user!.id,
    pick(req.query, ["page", "limit"])
  );
  sendResponse(res, { message: "Symptoms fetched successfully!", data });
});
const getToday = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await symptomServices.getToday(req.user!.id);
  sendResponse(res, { message: "Today's symptom fetched successfully!", data });
});

export const symptomController = { create, getMy, getToday };
