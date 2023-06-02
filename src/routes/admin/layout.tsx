import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import prisma from "~/lib/prisma";

export const useCategories = routeLoader$(async () => {
  const res = await prisma.category.findMany();
  return res;
});

export default component$(() => {
  return (
    <main class="container mx-auto p-4 pt-16">
      <Slot />
    </main>
  );
});
