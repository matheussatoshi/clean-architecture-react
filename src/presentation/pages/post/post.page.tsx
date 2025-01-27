import { inject } from "@/domain/inject";
import { PostBodyResponse, PostsController } from "@/domain/modules/posts";
import { Link } from "@/presentation/components";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContent } from "./(components)/post-content";

export default function PostPage() {
  const { id, author } = useParams<{ id: string; author: string }>();
  const posts = inject<PostsController>("postsService");
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
    <div>
      {loading && !error && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {data && !loading && !error && (
        <PostContent author={author} body={data.body} title={data.title} />
      )}
      <br />
      <Link href="/">Go Home</Link>
    </div>
  );
}
