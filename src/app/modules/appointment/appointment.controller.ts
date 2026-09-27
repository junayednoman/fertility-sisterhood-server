import { Response } from "express";
import { TRequest } from "../../interface/global.interface.js";
import handleAsyncRequest from "../../utils/handleAsyncRequest.js";
import pick from "../../utils/pick.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { appointmentServices } from "./appointment.service.js";

const create = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await appointmentServices.create(req.user!.id, req.body);
  sendResponse(res, {
    status: 201,
    message: "Appointment created successfully!",
    data,
  });
});
const getMy = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await appointmentServices.getMy(
    req.user!.id,
    pick(req.query, ["page", "limit"])
  );
  sendResponse(res, { message: "Appointments fetched successfully!", data });
});
const getSingle = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await appointmentServices.getSingle(
    req.user!.id,
    req.params.id as string
  );
  sendResponse(res, { message: "Appointment fetched successfully!", data });
});
export const appointmentController = { create, getMy, getSingle };
