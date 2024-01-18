import { relativeDate } from "@/lib/date-format";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function ShowThreads() {
  const posts = await db.thread.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="sm:my-20 my-5 flex flex-col space-y-5 sm:items-start items-center sm:justify-start justify-center">
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <div className="flex items-start border-b relative justify-start space-x-2">
            <div>
              <Image
                className="rounded-full relative"
                src={post?.author?.image as string}
                width={40}
                height={40}
                alt="profile pic"
              />
              <div className="w-[2px] bg-[#e5e5e5] h-[85%] absolute flex items-center justify-center inset-x-3  overflow-hidden" />
            </div>
            <div className="flex flex-col items-start justify-between w-full">
              <Link
                className="hover:underline transition-all"
                href={`/user/${post.author.userName}`}
              >
                {post.author.userName}
              </Link>
                <p className="ml-auto text-sm text-slate-600 left-0">{relativeDate(post.createdAt)}</p>
              <div className="">
                <p>{post.postMessage}</p>
              </div>
              <div className="my-5">
                <Image
                  className="object-cover z-50 sm:w-[400px] rounded-md object-center sm:h-[400px]"
                  alt="post image"
                  src={post.postImage}
                  width={1980}
                  height={1080}
                />
              </div>
              <div></div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}