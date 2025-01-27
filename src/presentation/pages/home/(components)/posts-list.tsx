import { PostBodyResponse } from "@/domain/modules/posts";
import { useMemo } from "react";
import { PostItem } from "./post-item";

export function PostList({ data }: { data: PostBodyResponse[] }) {
  const postsMemo = useMemo(() => data, [data]);

  return (
    <ol>
      {postsMemo.map((post) => (
        <PostItem id={post.id} {...post} />
      ))}
    </ol>
  );
}
