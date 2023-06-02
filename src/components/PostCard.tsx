import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import getArabicDateFormat from "~/lib/getArabicDateFormat";

export const PostCard = component$(
  ({
    id,
    title,
    createdAt,
  }: {
    id: string;
    title: string;
    createdAt: Date;
  }) => {
    return (
      <div class="card bg-slate-950 shadow-xl mb-3 md:w-4/5">
        <div class="card-body">
          <h2 class="card-title">{title}</h2>
          <p class="text-lg">{getArabicDateFormat(createdAt)}</p>
          <div class="card-actions justify-end md:justify-end">
            <Link href={`/blogs/${id}`} class="btn btn-primary">
              أكمل القراءة
            </Link>
          </div>
        </div>
      </div>
    );
  }
);
