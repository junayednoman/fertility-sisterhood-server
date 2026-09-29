import { Router } from "express";
import { UserRole } from "@prisma/client";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { medicationController } from "./medication.controller.js";
import {
  createMedicationZod,
  updateMedicationZod,
} from "./medication.validation.js";

const router = Router();
router.use(authorize(UserRole.USER));
router.post("/", validate(createMedicationZod), medicationController.create);
router.get("/", medicationController.getMy);
router.get("/:id", medicationController.getSingle);
router.patch(
  "/:id",
  validate(updateMedicationZod),
  medicationController.update
);
router.delete("/:id", medicationController.remove);

export const medicationRoutes = router;
