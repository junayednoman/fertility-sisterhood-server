import { CostCategory, CostIvfRound, CostType } from "@prisma/client";
import { z } from "zod";

export const createCostZod = z.object({
  amount: z.number().finite(),
  date: z.coerce.date(),
  isPaid: z.boolean(),
  ivfRound: z.nativeEnum(CostIvfRound),
  type: z.nativeEnum(CostType),
  category: z.nativeEnum(CostCategory),
  description: z.string().trim().optional(),
});
export const updateCostZod = createCostZod.partial();
export type TCreateCost = z.infer<typeof createCostZod>;
export type TUpdateCost = z.infer<typeof updateCostZod>;
