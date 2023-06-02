import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <main class="container mx-auto p-4 pt-16">
      <Slot />
    </main>
  );
});
