import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { PostCard } from "~/components/PostCard";
import { usePostData } from "../layout";

export default component$(() => {
  const posts = usePostData();
  return (
    <div class="flex flex-col items-stretch md:items-center">
      {posts.value.length > 0 ? (
        posts.value.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            id={post.id}
            createdAt={post.createdAt}
          />
        ))
      ) : (
        <p class="text-lg text-center mt-3">لا يوجد مقالات لعرضها</p>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Blogs",
};
