import { Router } from "express";
import { UserRole } from "@prisma/client";
import authorize from "../../middlewares/authorize.js";
import { adminController } from "./admin.controller.js";
import validate from "../../middlewares/validate.js";
import { profileUpdateZod } from "./admin.validation.js";

const router = Router();

router.get("/profile", authorize(UserRole.ADMIN), adminController.getProfile);
router.patch(
  "/profile",
  authorize(UserRole.ADMIN),
  validate(profileUpdateZod),
  adminController.updateProfile
);

export const adminRoutes = router;
