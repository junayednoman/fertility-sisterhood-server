import { Router } from "express";
import { UserRole } from "@prisma/client";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { appointmentController } from "./appointment.controller.js";
import {
  createAppointmentZod,
  updateAppointmentZod,
} from "./appointment.validation.js";

const router = Router();
router.use(authorize(UserRole.USER));
router.post("/", validate(createAppointmentZod), appointmentController.create);
router.get("/", appointmentController.getMy);
router.patch(
  "/:id",
  validate(updateAppointmentZod),
  appointmentController.update
);
router.delete("/:id", appointmentController.remove);
router.get("/:id", appointmentController.getSingle);

export const appointmentRoutes = router;
