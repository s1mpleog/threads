import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await auth();
      if (!user?.user?.id) throw new Error("Unauthorized");
      return { userId: user?.user?.id };
    })
    .onUploadComplete(() => {}),
  postImage: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await auth();
      if (!user?.user?.id) throw new Error("Unauthorized");
      return { userId: user?.user?.id };
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
