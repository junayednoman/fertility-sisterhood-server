import { Router } from "express";
import { UserRole } from "@prisma/client";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { testResultController } from "./testResult.controller.js";
import {
  createTestResultZod,
  updateTestResultZod,
} from "./testResult.validation.js";

const router = Router();
router.use(authorize(UserRole.USER));
router.post("/", validate(createTestResultZod), testResultController.create);
router.get("/", testResultController.getMy);
router.get("/:id", testResultController.getSingle);
router.patch(
  "/:id",
  validate(updateTestResultZod),
  testResultController.update
);
router.delete("/:id", testResultController.remove);

export const testResultRoutes = router;
