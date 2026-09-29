import { Router } from "express";
import { UserRole } from "@prisma/client";
import authorize from "../../middlewares/authorize.js";
import { profileController } from "./profile.controller.js";
import validate from "../../middlewares/validate.js";
import { profileUpdateZod } from "./profile.validation.js";

const router = Router();

router.get(
  "/",
  authorize(UserRole.ADMIN, UserRole.USER),
  profileController.getProfile
);
router.patch(
  "/",
  authorize(UserRole.ADMIN, UserRole.USER),
  validate(profileUpdateZod),
  profileController.updateProfile
);

export const profileRoutes = router;
