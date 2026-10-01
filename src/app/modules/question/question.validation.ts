import { z } from "zod";

export const createQuestionZod = z.object({
  appointmentId: z.string().min(1),
  text: z.string().trim().min(1),
});
export const updateQuestionZod = z.object({
  appointmentId: z.string().min(1).optional(),
  text: z.string().trim().min(1).optional(),
});
export type TCreateQuestion = z.infer<typeof createQuestionZod>;
export type TUpdateQuestion = z.infer<typeof updateQuestionZod>;
