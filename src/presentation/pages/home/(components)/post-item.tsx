import { PostBodyResponse } from "@/domain/modules/posts";
import { urls } from "@/main/routing";
import { Link } from "@/presentation/components";
import { memo } from "react";

export const PostItem = memo((data: PostBodyResponse) => {
  const redirect = `${urls.redirect.POST}/${data.id}/matheusscode`;

  return (
    <Link href={redirect}>
      <h1>{data.title.toUpperCase()}</h1>
      <p>{data.body}</p>
      <span>
        Author: <strong>Matheus Figueiredo</strong>
      </span>
    </Link>
  );
});
