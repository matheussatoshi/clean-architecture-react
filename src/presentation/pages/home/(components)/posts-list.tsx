import { PostBodyResponse } from "@/domain/modules/posts";
import { useMemo } from "react";
import { PostItem } from "./post-item";

export function PostList({ data }: { data: PostBodyResponse[] }) {
  const postsMemo = useMemo(() => data, [data]);

  return (
    <ol className="w-full grid grid-cols-3 p-4 mt-10 gap-6">
      {postsMemo.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </ol>
  );
}
