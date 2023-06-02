import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Hero = component$(() => {
  return (
    <div
      class="hero min-h-screen"
      style={{
        backgroundImage: `url("/images/hero.jpg")`,
      }}
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold leading-tight">
            أحدث أخبار التكنولوجيا
          </h1>
          <p class="mb-5">
            بإمكانك متابعة أحدث أخبار البرمجة والتكنولوجيا وقراءة مستجدات
            الأبحاث في المجال هنا
          </p>
          <Link href="/blogs" class="btn btn-primary text-lg">
            المقالات
          </Link>
        </div>
      </div>
    </div>
  );
});
