import { memo } from "react";

export const PostContent = memo(
  ({
    title,
    body,
    author,
  }: {
    title: string;
    body: string;
    author: string;
  }) => {
    if (!title && !body) {
      return <p>Não foi possível carregar o conteúdo</p>;
    }

    return (
      <div className="flex flex-col gap-4 p-10 text-center">
        <h1 className="text-4xl">{title.toUpperCase()}</h1>
        <p className="text-lg text-neutral-500 mt-10 text-left">{body} </p>
        <h3 className="text-right text-xl">By: {author}</h3>
      </div>
    );
  },
);
