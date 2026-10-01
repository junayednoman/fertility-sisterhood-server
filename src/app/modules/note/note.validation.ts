import { z } from "zod";

export const createNoteZod = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  date: z.coerce.date(),
  tags: z.array(z.string().trim().min(1)).default([]),
});
export const updateNoteZod = createNoteZod.partial();
export type TCreateNote = z.infer<typeof createNoteZod>;
export type TUpdateNote = z.infer<typeof updateNoteZod>;
