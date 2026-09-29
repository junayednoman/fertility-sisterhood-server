import { Router } from "express";
import { UserRole } from "@prisma/client";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { symptomController } from "./symptom.controller.js";
import { createSymptomZod, updateSymptomZod } from "./symptom.validation.js";

const router = Router();
router.use(authorize(UserRole.USER));
router.post("/", validate(createSymptomZod), symptomController.create);
router.get("/today", symptomController.getToday);
router.get("/", symptomController.getMy);
router.patch("/:id", validate(updateSymptomZod), symptomController.update);
router.delete("/:id", symptomController.remove);

export const symptomRoutes = router;
