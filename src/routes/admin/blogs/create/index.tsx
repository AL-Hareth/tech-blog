/**
 * @todo link the user with his post in the routeAction$.
 */

import { Resource, component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  Form,
  routeAction$,
  zod$,
  z,
} from "@builder.io/qwik-city";
import { QwikEditor } from "~/integration/Tinymce";
import prisma from "~/lib/prisma";
import useCurrentUser from "~/lib/useCurrentUser";
import { useCategories } from "../../layout";
import { useStylesScoped$ } from "@builder.io/qwik";

export const useAddPost = routeAction$(
  async (data) => {
    await prisma.post.create({
      data: {
        title: data.title,
        body: data.body,
        catrgories: {
          connect: data.catrgories.map((catrgory) => ({ name: catrgory })),
        },
        userId: data.userId,
      },
    });
  },
  zod$({
    title: z.string({
      required_error: "Title is required!",
    }),
    body: z.string({
      required_error: "body is required!",
    }),
    userId: z.string(),
    catrgories: z.string().array(),
  })
);

export default component$(() => {
  const user = useCurrentUser();
  const categories = useCategories();
  const addPost = useAddPost();

  useStylesScoped$(`
    select {
      overflow: auto;
      scrollbar-width: thin;
      scrollbar-color: transparent transparent;
    }
  `);
  return (
    <Resource
      value={user}
      onPending={() => (
        <h1 class="text-2xl text-center bg-green-300 text-green-900 font-bold px-2 py-4 rounded-lg mt-4">
          Loading...
        </h1>
      )}
      onResolved={(user) =>
        user && ["WRITER", "ADMIN"].includes(user.role) ? (
          <Form action={addPost} class="flex flex-col">
            <input type="hidden" value={user.id} name="userId" />
            <input
              type="text"
              placeholder="Title"
              name="title"
              class="mb-2 py-2 px-4 rounded-lg bg-base-content text-black placeholder:text-gray-500"
            />
            <QwikEditor name="body" />
            <div class="bg-green-300 text-green-900 font-bold my-3 py-4 px-2 rounded-lg">
              <ul class="list-disc ml-5">
                <li>لإنشاء منشور جديد تأكد من اختيار عنوان ومحتوى مناسب</li>
                <li>
                  إذا أردت إضافة جزئية كود للمنشور عليك استخدام pre ووضع الكود
                  فيها ويمكنك تلوين النص بما يناسبك
                </li>
                <li>
                  يفضل أن يكون النص أبيض اللون بخلفية سوداء لتناسبها مع شكل
                  الموقع
                </li>
              </ul>
            </div>
            <div class="flex justify-between items-center pt-3">
              <button class="btn btn-accent self-start px-12 mt-4 font-normal">
                Create
              </button>
              <select
                size={2}
                class="select select-accent max-w-xs w-1/2"
                name="catrgories[]"
                multiple
              >
                <option class="bg-emerald-900 text-white" disabled selected>
                  Categories (multi-select)
                </option>
                {categories.value.map((catrgory) => (
                  <option key={catrgory.id}>{catrgory.name}</option>
                ))}
              </select>
            </div>
          </Form>
        ) : (
          <h1 class="text-2xl text-center bg-red-300 text-red-900 font-bold px-2 py-4 rounded-lg mt-4">
            Sorry You can't View this page
          </h1>
        )
      }
    />
  );
});

export const head: DocumentHead = {
  title: "Create A New Post",
};
