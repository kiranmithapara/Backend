import { email, z } from "zod";

export const dataSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("enter a valid email id."),
  age: z.number(),
  city: z.string(),
});
