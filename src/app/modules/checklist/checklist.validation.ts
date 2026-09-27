import { ChecklistCategory } from "@prisma/client";
import { z } from "zod";

export const createChecklistZod = z.object({
  title: z.string().trim().min(1),
  category: z.nativeEnum(ChecklistCategory),
  date: z.coerce.date().optional(),
  description: z.string().trim().optional(),
});
export const checklistQueryZod = z.object({
  category: z.nativeEnum(ChecklistCategory).optional(),
});
export type TCreateChecklist = z.infer<typeof createChecklistZod>;
