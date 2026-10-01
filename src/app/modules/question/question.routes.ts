import { Router } from "express";
import { UserRole } from "@prisma/client";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { questionController } from "./question.controller.js";
import { createQuestionZod, updateQuestionZod } from "./question.validation.js";

const router = Router();
router.use(authorize(UserRole.USER));
router.post("/", validate(createQuestionZod), questionController.create);
router.get("/", questionController.getMy);
router.patch("/:id", validate(updateQuestionZod), questionController.update);
router.delete("/:id", questionController.remove);

export const questionRoutes = router;
