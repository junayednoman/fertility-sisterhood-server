import { Router } from "express";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { checklistController } from "./checklist.controller.js";
import { createChecklistZod } from "./checklist.validation.js";

const router = Router();
router.post(
  "/",
  authorize(),
  validate(createChecklistZod),
  checklistController.create
);
router.get("/today", authorize(), checklistController.getToday);
router.patch("/:id/done", authorize(), checklistController.markDone);
export const checklistRoutes = router;
