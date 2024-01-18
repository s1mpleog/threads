"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import Link from "next/link";
import { registerUserToDb } from "@/actions/register";

export default function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    registerUserToDb(values);
    
  };
  return (
    <div className="flex flex-col items-center justify-center sm:-mt-20 sm:max-w-sm  mx-auto mt-0 space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="bg-primary-foreground"
                    {...field}
                    type="email"
                    placeholder="your email address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="bg-primary-foreground"
                    {...field}
                    type="password"
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} className="w-full" type="submit">
            Register
          </Button>
        </form>
      </Form>
      <Link href="/login">
        <Button variant="link">
          Already have an Account ?
        </Button>
      </Link>
    </div>
  );
}
