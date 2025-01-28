import type { PostBodyResponse } from "@/data/usecases";
import type { PostsControllerContract } from "@/domain/contracts/posts";
import { inject } from "@/infra/lib/inject";
import { Link } from "@/presentation/components";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContent } from "./(components)/post-content";

export default function PostPage() {
  const { id, author } = useParams<{ id: string; author: string }>();
  const posts = inject<PostsControllerContract>("posts");
  const [data, setData] = useState<PostBodyResponse | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const getPostById = useCallback(async () => {
    const [ok, err, response] = await posts.findById(id);

    if (ok) {
      setData(response?.data);
      setError("");
    }

    if (err) setError("Algo deu errado");

    setLoading(false);
  }, [posts]);

  useEffect(() => {
    getPostById();
  }, []);

  return (
    <div className="p-10 max-w-7xl mx-auto justify-center flex flex-col">
      {loading && !error && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <Link
        className="text-left flex transition-all gap-2 hover:gap-2.5 w-[120px] py-2 px-2 text-blue-500"
        href="/"
      >
        <span>{"⬅️"}</span> <span>Go Home</span>
      </Link>
      {data && !loading && !error && (
        <PostContent author={author} body={data.body} title={data.title} />
      )}
      <br />
    </div>
  );
}
