import { z } from "zod";

export const createJournalZod = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
});

export type TCreateJournal = z.infer<typeof createJournalZod>;

export const updateJournalZod = createJournalZod.partial();
export type TUpdateJournal = z.infer<typeof updateJournalZod>;
