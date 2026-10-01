import { Response } from "express";
import { TRequest } from "../../interface/global.interface.js";
import handleAsyncRequest from "../../utils/handleAsyncRequest.js";
import pick from "../../utils/pick.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { questionServices } from "./question.service.js";

const create = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await questionServices.create(req.user!.id, req.body);
  sendResponse(res, {
    status: 201,
    message: "Question created successfully!",
    data,
  });
});
const getMy = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await questionServices.getMy(
    req.user!.id,
    pick(req.query, ["page", "limit"])
  );
  sendResponse(res, { message: "Questions fetched successfully!", data });
});
const update = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await questionServices.update(
    req.user!.id,
    req.params.id as string,
    req.body
  );
  sendResponse(res, { message: "Question updated successfully!", data });
});
const remove = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await questionServices.remove(
    req.user!.id,
    req.params.id as string
  );
  sendResponse(res, { message: "Question deleted successfully!", data });
});

export const questionController = { create, getMy, update, remove };
