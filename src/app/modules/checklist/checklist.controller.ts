import { Response } from "express";
import { ChecklistCategory } from "@prisma/client";
import { TRequest } from "../../interface/global.interface.js";
import handleAsyncRequest from "../../utils/handleAsyncRequest.js";
import pick from "../../utils/pick.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { checklistServices } from "./checklist.service.js";
import { checklistQueryZod } from "./checklist.validation.js";

const create = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await checklistServices.create(req.user!.id, req.body);
  sendResponse(res, {
    status: 201,
    message: "Checklist item created successfully!",
    data,
  });
});

const getToday = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const { category } = checklistQueryZod.parse(req.query);
  const data = await checklistServices.getToday(
    req.user!.id,
    pick(req.query, ["page", "limit"]),
    category as ChecklistCategory | undefined
  );
  sendResponse(res, {
    message: "Today's checklist fetched successfully!",
    data,
  });
});

const markDone = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await checklistServices.markDone(
    req.user!.id,
    req.params.id as string
  );
  sendResponse(res, { message: "Checklist item marked as completed!", data });
});

const update = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await checklistServices.update(
    req.user!.id,
    req.params.id as string,
    req.body
  );
  sendResponse(res, { message: "Checklist item updated successfully!", data });
});

const remove = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await checklistServices.remove(
    req.user!.id,
    req.params.id as string
  );
  sendResponse(res, { message: "Checklist item deleted successfully!", data });
});

export const checklistController = {
  create,
  getToday,
  markDone,
  update,
  remove,
};
