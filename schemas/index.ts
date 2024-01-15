import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().min(1, {
    message: "E-mail is required.",
  }),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters.",
  }),
});
