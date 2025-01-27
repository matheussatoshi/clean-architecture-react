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
      <div>
        <h1>{title.toUpperCase()}</h1>
        <p>{body} </p>
        <h3>By: {author}</h3>
      </div>
    );
  },
);
