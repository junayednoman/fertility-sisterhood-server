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
import { costRoutes } from "../modules/cost/cost.routes.js";
import { testResultRoutes } from "../modules/testResult/testResult.routes.js";
import { noteRoutes } from "../modules/note/note.routes.js";
import { questionRoutes } from "../modules/question/question.routes.js";

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
  { path: "/costs", route: costRoutes },
  { path: "/test-results", route: testResultRoutes },
  { path: "/notes", route: noteRoutes },
  { path: "/questions", route: questionRoutes },
];

routes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
