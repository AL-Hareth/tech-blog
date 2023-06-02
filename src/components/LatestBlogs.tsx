import { component$ } from "@builder.io/qwik";
import { usePostData } from "~/routes/layout";
import { PostCard } from "./PostCard";
import { Link } from "@builder.io/qwik-city";

export const LatestBlogs = component$(() => {
  const posts = usePostData();
  return (
    <div class="container mx-auto p-6 flex flex-col md:items-center items-stretch">
      {posts.value.slice(0, 3).map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          createdAt={post.createdAt}
        />
      ))}
      <Link href="/blogs" class="btn btn-primary self-center">
        المزيد...
      </Link>
    </div>
  );
});
