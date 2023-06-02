import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { type DocumentHead, Form, routeAction$ } from "@builder.io/qwik-city";
import type { Post } from "@prisma/client";
import { PostCard } from "~/components/PostCard";
import prisma from "~/lib/prisma";
import useCurrentUser from "~/lib/useCurrentUser";

export const useDeletePost = routeAction$(async (data) => {
  await prisma.post.delete({
    where: {
      id: data.id as string,
    },
  });
});

export default component$(() => {
  const user = useCurrentUser();

  const refetcher = useSignal(0);
  const deletePost = useDeletePost();

  const posts = useResource$<Post[]>(async ({ track }) => {
    track(() => refetcher.value);

    const currentUser = await user.value;
    if (currentUser) {
      const res = await fetch(
        `http://localhost:5173/api/blog-by-user/${currentUser.id}`
      );
      return await res.json();
    }
  });

  const refetchTrigger = $(() => {
    refetcher.value += 1;
  });

  return (
    <Resource
      value={posts}
      onResolved={(posts) => {
        return (
          <div class="flex flex-col md:w-4/5 mx-auto">
            {posts.length > 0 ? (
              (posts.map((post) => {
                return (
                  <>
                    <Form
                      onSubmit$={refetchTrigger}
                      action={deletePost}
                      class="flex flex-col flex-1 md:items-center mb-3"
                    >
                      <PostCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        createdAt={post.createdAt}
                      />
                      <input type="hidden" name="id" value={post.id} />
                      <button class="btn btn-error md:w-4/5">حذف</button>
                    </Form>
                  </>
                );
              }) as any)
            ) : (
              <p class="text-lg">لا يوجد مقالات لعرضها</p>
            )}
          </div>
        );
      }}
    />
  );
});

export const head: DocumentHead = {
  title: "مقالاتي",
};
