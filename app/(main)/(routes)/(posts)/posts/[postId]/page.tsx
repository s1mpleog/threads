import { auth } from "@/auth";
import { relativeDate } from "@/lib/date-format";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import PostComments from "../../_components/PostComments";
import ShowComments from "../../_components/ShowComments";

export default async function PostIdPage({
  params,
}: {
  params: { postId: string };
}) {
  const id = params.postId;
  const session = await auth();
  if (!session) return redirect("/login");
  const post = await db.thread.findFirst({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
  const comments = await db.comment.findMany({
    where: {
      threadPostId: post?.id,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const user = await db.user.findUnique({
    where: {
        id: session?.user?.id
    }
  })
  return (
    <div className="my-20 flex flex-col space-y-5 items-start justify-start">
      <div>
        <div className="flex items-start relative justify-start space-x-2">
          <div>
            <Image
              className="rounded-full relative"
              src={post?.author?.image as string}
              width={40}
              height={40}
              alt="profile pic"
            />
          </div>
          <div className="flex flex-col items-start justify-between w-full">
            <Link
              className="hover:underline transition-all"
              href={`/user/${post?.author.userName}`}
            >
              {post?.author.userName!}
            </Link>
            <p className="ml-auto text-sm text-slate-600 left-0">
              {/* @ts-ignore */}
              {relativeDate(post.createdAt)}
            </p>
            <div className="">
              <p>{post?.postMessage}</p>
            </div>
            <div className="my-5">
              <Image
                className="object-cover z-50 sm:w-[400px] rounded-md sm:h-[400px]"
                alt="post image"
                src={post?.postImage!}
                width={1980}
                height={1080}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <div className="min-w-full">
            {/* @ts-ignore */}
            <PostComments comment={comments} author={user!} key={user?.id} postId={post?.id as string} />
        </div>
        <div className="mt-14">
            <ShowComments postId={post?.id!} />
        </div>
      </div>
    </div>
  );
}
