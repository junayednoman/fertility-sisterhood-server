import { Router } from "express";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.js";
import { journalController } from "./journal.controller.js";
import { createJournalZod } from "./journal.validation.js";

const router = Router();
router.post(
  "/",
  authorize(),
  validate(createJournalZod),
  journalController.create
);
router.get("/", authorize(), journalController.getMy);
export const journalRoutes = router;
