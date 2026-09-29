import { Mood, SymptomName } from "@prisma/client";
import { z } from "zod";

export const createSymptomZod = z.object({
  symptomName: z.nativeEnum(SymptomName),
  moods: z.array(z.nativeEnum(Mood)).default([]),
  note: z.string().trim().optional(),
  date: z.coerce.date().optional(),
});

export type TCreateSymptom = z.infer<typeof createSymptomZod>;

export const updateSymptomZod = z.object({
  symptomName: z.nativeEnum(SymptomName).optional(),
  moods: z.array(z.nativeEnum(Mood)).optional(),
  note: z.string().trim().optional(),
  date: z.coerce.date().optional(),
});
export type TUpdateSymptom = z.infer<typeof updateSymptomZod>;
