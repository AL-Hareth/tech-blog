import { component$ } from "@builder.io/qwik";

export const JoinUs = component$(() => {
  return (
    <div class="bg-base-300 py-10">
      <h1 class="text-center">Join us</h1>
      <div class="flex justify-center pt-4">
        <a
          href="mailto:alharethturab@gmail.com"
          class="btn btn-accent text-center"
        >
          تواصل معي
        </a>
      </div>
    </div>
  );
});
