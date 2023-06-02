import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import prisma from "~/lib/prisma";

export const usePostData = routeLoader$(async () => {
  const res = await prisma.post.findMany({
    select: {
      body: true,
      title: true,
      createdAt: true,
      userId: true,
      id: true,
      catrgories: true,
    },
  });
  return res;
});

export default component$(() => {
  return (
    <main class="min-h-screen">
      <Navbar />
      <Slot />
      <Footer />
    </main>
  );
});
