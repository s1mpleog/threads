"use client";
import * as z from "zod";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { postThreadsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "@/components/FileUpload";
import { useState, useTransition } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { postThreads } from "@/actions/post-threads";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ThreadsFormProps {
  user: User;
}
export default function ThreadsForm({ user }: ThreadsFormProps) {
  const [imagePreview, setImagePreview] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof postThreadsSchema>>({
    resolver: zodResolver(postThreadsSchema),
    defaultValues: {
      message: "",
      image: "",
    },
  });
  const onUpload = (url: string) => {
    form.setValue("image", url);
    setImagePreview(url);
  };
  const onSubmit = (values: z.infer<typeof postThreadsSchema>) => {
    startTransition(() => {
      postThreads(values);
      toast.success("thread posted");
      form.reset();
      router.push("/");
      router.refresh();
    });
  };
  return (
    <div className="flex space-y-6 flex-col items-center justify-center">
      <Form {...form}>
        <form
          className="space-y-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-center">
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="preview"
                width={200}
                height={200}
              />
            )}
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUpload
                    endPoint="postImage"
                    onChange={(url) => onUpload(url as string)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Your ideas</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    {...field}
                    placeholder="post about cr7"
                    className="h-56 w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            className="w-full"
            type="submit"
            size="lg"
          >
            Post Threads
          </Button>
        </form>
      </Form>
    </div>
  );
}
