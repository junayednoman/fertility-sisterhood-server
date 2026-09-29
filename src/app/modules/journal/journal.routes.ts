import { Router } from "express";
import { UserRole } from "@prisma/client";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { journalController } from "./journal.controller.js";
import { createJournalZod, updateJournalZod } from "./journal.validation.js";

const router = Router();
router.use(authorize(UserRole.USER));
router.post("/", validate(createJournalZod), journalController.create);
router.get("/", journalController.getMy);
router.patch("/:id", validate(updateJournalZod), journalController.update);
router.delete("/:id", journalController.remove);

export const journalRoutes = router;
