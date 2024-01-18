"use client";
import * as z from "zod";
import { onBoardingSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "@/components/FileUpload";
import { useState, useTransition } from "react";
import Image from "next/image";
import { onBoarding } from "@/actions/on-boarding";
import { useRouter } from "next/navigation";

export default function BoardingForm() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof onBoardingSchema>>({
    resolver: zodResolver(onBoardingSchema),
    defaultValues: {
      bio: "",
      image: "",
      name: "",
      username: "",
    },
  });
  const onUpload = (url: string) => {
    form.setValue("image", url);
    setImagePreview(url);
  };

  const onSubmit = (values: z.infer<typeof onBoardingSchema>) => {
    startTransition(() => {
      onBoarding(values);
    //   form.reset();
    //   toast.success("Profile created");
      router.push("/");
    });
  };
  return (
    <div className="flex flex-col items-center w-full justify-center space-y-4 py-4">
      <div>
        <h1 className="text-3xl sm:text-5xl font-bold text-center">
          Welcome to threads
        </h1>
      </div>
      <div>
        <Form {...form}>
          <div className="flex items-center justify-center">
            {imagePreview && (
              <Image
                className="rounded-full object-center object-cover"
                src={imagePreview}
                alt="imagePreview"
                width={100}
                height={100}
              />
            )}
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:w-[700px]"
          >
            <FormField
              disabled={isPending}
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      endPoint="profileImage"
                      onChange={(url) => onUpload(url as string)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="e.g.john doe" />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="e.g.@johndoe" />
                  </FormControl>
                  <FormDescription>
                    This is your public username.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-60"
                      {...field}
                      //   type="text"
                      placeholder="e.g.i am a huge fan of cr7"
                    />
                  </FormControl>
                  <FormDescription>Enter your bio.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              className="w-full"
              type="submit"
              size="lg"
            >
              Create Profile
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
 