import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().min(1, {
    message: "E-mail is required.",
  }),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters.",
  }),
});

export const LoginSchema = z.object({
  email: z.string().min(1, {
    message: "E-mail is required.",
  }),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters.",
  }),
});

export const onBoardingSchema = z.object({
  image: z.string().min(1, {
    message: "Profile pic is required!",
  }),
  name: z.string().min(1, {
    message: "Name is required!",
  }),
  username: z.string().min(1, {
    message: "username is required",
  }),
  bio: z.string(),
});

export const postThreadsSchema = z.object({
  message: z.string().min(1, {
    message: "Message is required",
  }),
  image: z.string(),
});

export const commentSchema = z.object({
  content: z.string().min(1, {
    message: "comment is required",
  }),
});
