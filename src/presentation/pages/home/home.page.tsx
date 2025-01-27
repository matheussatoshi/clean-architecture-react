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

    console.log(ok);

    if (ok) setData(response.data);

    if (err) setError(err.message);

    setLoading(false);
  }, [posts]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="p-10 h-full max-w-7xl w-full mx-auto flex flex-col justify-center items-center">
      <h1 className="bg-white w-full text-center text-4xl pt-4 pb-8 sticky top-0">
        All Posts
      </h1>
      {loading && !error && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && !loading && !error && <PostList data={data} />}
    </div>
  );
}
