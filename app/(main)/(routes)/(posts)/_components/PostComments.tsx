"use client";
import * as z from "zod";
import { commentSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { postComments } from "@/actions/post-comments";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface PostCommentsPage {
  comment: Comment;
  author: User;
  postId: string;
}
export default function PostComments({
  comment,
  author,
  postId,
}: PostCommentsPage) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = (values: z.infer<typeof commentSchema>) => {
    startTransition(() => {
      postComments(values, postId);
    });
    form.reset();
    router.refresh();
  };
  return (
    <div className="w-full">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=""
      >
        <div className="flex w-full items-center justify-start gap-2">
          <Image
            className="rounded-full"
            src={author.image as string}
            width={40}
            height={40}
            alt="profile pic"
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="comment"
                    className="min-w-full flex-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} className="" type="submit">
            Reply
          </Button>
        </div>
      </form>
    </Form>
    </div>
  );
}
