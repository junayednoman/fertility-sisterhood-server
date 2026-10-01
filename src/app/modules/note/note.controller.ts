import { Response } from "express";
import { TRequest } from "../../interface/global.interface.js";
import handleAsyncRequest from "../../utils/handleAsyncRequest.js";
import pick from "../../utils/pick.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { noteServices } from "./note.service.js";

const create = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await noteServices.create(req.user!.id, req.body);
  sendResponse(res, {
    status: 201,
    message: "Note created successfully!",
    data,
  });
});
const getMy = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await noteServices.getMy(
    req.user!.id,
    pick(req.query, ["page", "limit"])
  );
  sendResponse(res, { message: "Notes fetched successfully!", data });
});
const update = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await noteServices.update(
    req.user!.id,
    req.params.id as string,
    req.body
  );
  sendResponse(res, { message: "Note updated successfully!", data });
});
const remove = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await noteServices.remove(req.user!.id, req.params.id as string);
  sendResponse(res, { message: "Note deleted successfully!", data });
});

export const noteController = { create, getMy, update, remove };
