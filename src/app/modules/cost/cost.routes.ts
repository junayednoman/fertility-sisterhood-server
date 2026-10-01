import { Router } from "express";
import { UserRole } from "@prisma/client";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { costController } from "./cost.controller.js";
import { createCostZod, updateCostZod } from "./cost.validation.js";

const router = Router();
router.use(authorize(UserRole.USER));
router.post("/", validate(createCostZod), costController.create);
router.get("/", costController.getMy);
router.get("/:id", costController.getSingle);
router.patch("/:id", validate(updateCostZod), costController.update);
router.delete("/:id", costController.remove);

export const costRoutes = router;
