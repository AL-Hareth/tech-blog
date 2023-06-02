import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="pt-16">
      <Slot />
    </div>
  );
});
