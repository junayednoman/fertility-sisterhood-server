import { Router } from "express";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { medicationController } from "./medication.controller.js";
import { createMedicationZod } from "./medication.validation.js";

const router = Router();
router.post(
  "/",
  authorize(),
  validate(createMedicationZod),
  medicationController.create
);
router.get("/", authorize(), medicationController.getMy);
router.get("/:id", authorize(), medicationController.getSingle);
export const medicationRoutes = router;
