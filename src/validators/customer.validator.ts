import { email, z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(3, "enter a valid name"),
  phone: z.string().min(10, "enter a valid number"),
  email: z.string().email("enter a valid email"),
  address: z.string().optional(),
});
