import { z } from "zod";

export const createMedicationZod = z.object({
  name: z.string().trim().min(1),
  dose: z.string().trim().min(1),
  frequency: z.string().trim().min(1),
  type: z.string().trim().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export type TCreateMedication = z.infer<typeof createMedicationZod>;

export const updateMedicationZod = createMedicationZod.partial();
export type TUpdateMedication = z.infer<typeof updateMedicationZod>;
