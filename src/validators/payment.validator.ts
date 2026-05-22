import { z } from "zod";

export const paymentSchema = z.object({
  debt_id: z.number(),
  amount: z.number(),
});
