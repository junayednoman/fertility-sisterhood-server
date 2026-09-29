import { z } from "zod";

export const createAppointmentZod = z.object({
  doctor: z.string().trim().min(1),
  date: z.coerce.date(),
  time: z.string().trim().min(1),
});
export type TCreateAppointment = z.infer<typeof createAppointmentZod>;

export const updateAppointmentZod = createAppointmentZod.partial();
export type TUpdateAppointment = z.infer<typeof updateAppointmentZod>;
