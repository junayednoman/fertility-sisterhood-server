import { Response } from "express";
import { TRequest } from "../../interface/global.interface.js";
import handleAsyncRequest from "../../utils/handleAsyncRequest.js";
import pick from "../../utils/pick.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { costServices } from "./cost.service.js";

const create = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await costServices.create(req.user!.id, req.body);
  sendResponse(res, {
    status: 201,
    message: "Cost created successfully!",
    data,
  });
});
const getMy = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await costServices.getMy(
    req.user!.id,
    pick(req.query, ["page", "limit"])
  );
  sendResponse(res, { message: "Costs fetched successfully!", data });
});
const getSingle = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await costServices.getSingle(
    req.user!.id,
    req.params.id as string
  );
  sendResponse(res, { message: "Cost fetched successfully!", data });
});
const update = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await costServices.update(
    req.user!.id,
    req.params.id as string,
    req.body
  );
  sendResponse(res, { message: "Cost updated successfully!", data });
});
const remove = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await costServices.remove(req.user!.id, req.params.id as string);
  sendResponse(res, { message: "Cost deleted successfully!", data });
});

export const costController = { create, getMy, getSingle, update, remove };
