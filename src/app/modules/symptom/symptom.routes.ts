import { Router } from "express";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { symptomController } from "./symptom.controller.js";
import { createSymptomZod } from "./symptom.validation.js";

const router = Router();
router.post(
  "/",
  authorize(),
  validate(createSymptomZod),
  symptomController.create
);
router.get("/today", authorize(), symptomController.getToday);
router.get("/", authorize(), symptomController.getMy);

export const symptomRoutes = router;
