import { z } from "zod";

export const createTestResultZod = z.object({
  category: z.string().trim().min(1).optional(),
  name: z.string().trim().min(1),
  date: z.coerce.date(),
  value: z.string().trim().min(1),
  unit: z.string().trim().min(1),
  note: z.string().trim().optional(),
});
export const updateTestResultZod = createTestResultZod.partial();
export const testResultQueryZod = z.object({
  category: z.string().trim().min(1).optional(),
});
export type TCreateTestResult = z.infer<typeof createTestResultZod>;
export type TUpdateTestResult = z.infer<typeof updateTestResultZod>;
