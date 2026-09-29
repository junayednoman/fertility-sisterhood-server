import { Router } from "express";
import { UserRole } from "@prisma/client";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { checklistController } from "./checklist.controller.js";
import {
  createChecklistZod,
  updateChecklistZod,
} from "./checklist.validation.js";

const router = Router();
router.use(authorize(UserRole.USER));
router.post("/", validate(createChecklistZod), checklistController.create);
router.get("/today", checklistController.getToday);
router.patch("/:id/done", checklistController.markDone);
router.patch("/:id", validate(updateChecklistZod), checklistController.update);
router.delete("/:id", checklistController.remove);

export const checklistRoutes = router;
