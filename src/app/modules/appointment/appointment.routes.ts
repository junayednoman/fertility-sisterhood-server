import { Router } from "express";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { appointmentController } from "./appointment.controller.js";
import { createAppointmentZod } from "./appointment.validation.js";

const router = Router();
router.post(
  "/",
  authorize(),
  validate(createAppointmentZod),
  appointmentController.create
);
router.get("/", authorize(), appointmentController.getMy);
router.get("/:id", authorize(), appointmentController.getSingle);
export const appointmentRoutes = router;
