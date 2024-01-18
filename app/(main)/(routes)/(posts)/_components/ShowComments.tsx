import { relativeDate } from "@/lib/date-format";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

interface ShowCommentsProps {
  postId: string;
}

export default async function ShowComments({ postId }: ShowCommentsProps) {
  const comments = await db.comment.findMany({
    where: {
      threadPostId: postId,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="sm:min-w-[500px] mb-10">
      {comments.map((comment) => (
        <div key={comment.id} className="border-b border-t pt-3 pb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center justify-start gap-2">
              <Image
                className="rounded-full"
                src={comment?.author?.image!}
                width={40}
                height={40}
                alt="userProfile"
              />
              <Link href={`/user/${comment.author?.userName}`}>
                {comment.author?.userName}
              </Link>
            </div>
            <p>{relativeDate(comment.createdAt)}</p>
          </div>
          <div className="mt-5 pl-10 flex items-center justify-start">
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
