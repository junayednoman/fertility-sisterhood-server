import { Router } from "express";
import { legalRoutes } from "../modules/legal/legal.routes.js";
import { authRoutes } from "../modules/auth/auth.routes.js";
import { otpRoutes } from "../modules/otp/otp.routes.js";
import { notificationRoutes } from "../modules/notification/notification.routes.js";
import { symptomRoutes } from "../modules/symptom/symptom.routes.js";
import { appointmentRoutes } from "../modules/appointment/appointment.routes.js";
import { medicationRoutes } from "../modules/medication/medication.routes.js";
import { journalRoutes } from "../modules/journal/journal.routes.js";
import { checklistRoutes } from "../modules/checklist/checklist.routes.js";
import { profileRoutes } from "../modules/profile/profile.routes.js";

const router = Router();

const routes = [
  { path: "/legal", route: legalRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/otp", route: otpRoutes },
  { path: "/profile", route: profileRoutes },
  { path: "/notifications", route: notificationRoutes },
  { path: "/symptoms", route: symptomRoutes },
  { path: "/appointments", route: appointmentRoutes },
  { path: "/medications", route: medicationRoutes },
  { path: "/journals", route: journalRoutes },
  { path: "/checklists", route: checklistRoutes },
];

routes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
