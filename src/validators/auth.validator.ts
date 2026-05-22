import { email, z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email("invalid email address"),
  password: z.string().min(6, "password mus be ast least 5 characters"),
  role: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
