import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Hero } from "~/components/Hero";
import { JoinUs } from "~/components/JoinUs";
import { LatestBlogs } from "~/components/LatestBlogs";

export default component$(() => {
  return (
    <>
      <Hero />
      <LatestBlogs />
      <JoinUs />
    </>
  );
});

export const head: DocumentHead = {
  title: "Tech Blog",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
