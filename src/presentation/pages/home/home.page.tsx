import { inject } from "@/domain/inject";
import { PostBodyResponse, PostsController } from "@/domain/modules/posts";
import { useCallback, useEffect, useState } from "react";
import { PostList } from "./(components)";

export default function HomePage() {
  const posts = inject<PostsController>("postsService");
  const [data, setData] = useState<PostBodyResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const getPosts = useCallback(async () => {
    const [ok, err, response] = await posts.findAll();

    if (ok) {
      setData(response.data);
      setError("");
    }

    if (err) setError("Algo deu errado");

    setLoading(false);
  }, [posts]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {loading && !error && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && !loading && !error && <PostList data={data} />}
    </div>
  );
}
