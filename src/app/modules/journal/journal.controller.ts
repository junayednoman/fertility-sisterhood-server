import { Response } from "express";
import { TRequest } from "../../interface/global.interface.js";
import handleAsyncRequest from "../../utils/handleAsyncRequest.js";
import pick from "../../utils/pick.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { journalServices } from "./journal.service.js";

const create = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await journalServices.create(req.user!.id, req.body);
  sendResponse(res, {
    status: 201,
    message: "Journal entry created successfully!",
    data,
  });
});

const getMy = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await journalServices.getMy(
    req.user!.id,
    pick(req.query, ["page", "limit"])
  );
  sendResponse(res, { message: "Journal entries fetched successfully!", data });
});

const update = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await journalServices.update(
    req.user!.id,
    req.params.id as string,
    req.body
  );
  sendResponse(res, { message: "Journal entry updated successfully!", data });
});

const remove = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await journalServices.remove(
    req.user!.id,
    req.params.id as string
  );
  sendResponse(res, { message: "Journal entry deleted successfully!", data });
});

export const journalController = { create, getMy, update, remove };
