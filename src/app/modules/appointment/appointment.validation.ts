import { z } from "zod";

export const createAppointmentZod = z.object({
  doctor: z.string().trim().min(1),
  date: z.coerce.date(),
  time: z.string().trim().min(1),
  questions: z.array(z.string().trim().min(1)).default([]),
});
export type TCreateAppointment = z.infer<typeof createAppointmentZod>;
