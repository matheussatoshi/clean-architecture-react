import { PostBodyResponse } from "@/domain/modules/posts";
import { urls } from "@/main/routing";
import { Link } from "@/presentation/components";
import { memo } from "react";

export const PostItem = memo((data: PostBodyResponse) => {
  const redirect = `${urls.redirect.POST}/${data.id}/matheusscode`;

  return (
    <Link
      href={redirect}
      className="transition-all p-4 flex flex-col justify-between rounded-md shadow-sm border border-neutral-200 hover:bg-neutral-100"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">{data.title.toUpperCase()}</h1>
        <p className="text-neutral-500 mt-2.5">{data.body}</p>
      </div>
      <span className="text-right w-full">
        Author: <strong className="text-blue-500">Matheus Figueiredo</strong>
      </span>
    </Link>
  );
});
