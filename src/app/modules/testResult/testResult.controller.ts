import { Response } from "express";
import { TRequest } from "../../interface/global.interface.js";
import handleAsyncRequest from "../../utils/handleAsyncRequest.js";
import pick from "../../utils/pick.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { testResultServices } from "./testResult.service.js";
import { testResultQueryZod } from "./testResult.validation.js";

const create = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await testResultServices.create(req.user!.id, req.body);
  sendResponse(res, {
    status: 201,
    message: "Test result created successfully!",
    data,
  });
});
const getMy = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const { category } = testResultQueryZod.parse(req.query);
  const data = await testResultServices.getMy(
    req.user!.id,
    pick(req.query, ["page", "limit"]),
    category
  );
  sendResponse(res, { message: "Test results fetched successfully!", data });
});
const getSingle = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await testResultServices.getSingle(
    req.user!.id,
    req.params.id as string
  );
  sendResponse(res, { message: "Test result fetched successfully!", data });
});
const update = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await testResultServices.update(
    req.user!.id,
    req.params.id as string,
    req.body
  );
  sendResponse(res, { message: "Test result updated successfully!", data });
});
const remove = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const data = await testResultServices.remove(
    req.user!.id,
    req.params.id as string
  );
  sendResponse(res, { message: "Test result deleted successfully!", data });
});

export const testResultController = {
  create,
  getMy,
  getSingle,
  update,
  remove,
};
