import { z } from "zod";

export const insertUserSchema = z.object({
  name: z.string().min(8),
  password: z.string().min(8),
  email: z.string().email(),
});

export const insertAdressesSchema = z.object({
  user_id: z.number(),
  state: z.string().min(3),
  city: z.string().min(3),
  pincode: z.number().min(6),
});

export type insertUserType = z.infer<typeof insertUserSchema>;
export type insertAdressesType = z.infer<typeof insertAdressesSchema>;
