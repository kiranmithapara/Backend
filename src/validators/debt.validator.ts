import { z } from "zod";

export const debtSchema = z.object({
  customer_id: z.number(),
  amount: z.number(),
  status: z.string().optional(),
});
