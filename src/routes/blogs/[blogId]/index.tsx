import { component$ } from "@builder.io/qwik";
import {
    useLocation,
    type DocumentHead,
    server$,
} from "@builder.io/qwik-city";
import prisma from "~/lib/prisma";
import { usePostData } from "../../layout";
import getArabicDateFormat from "~/lib/getArabicDateFormat";

export const getUserById = server$(async (userId: string) => {
    return await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
});

export default component$(() => {
    const { params } = useLocation();
    const posts = usePostData();
    const post = posts.value.find((post) => post.id === params.blogId);
    return post ? (
        <div class="w-3/5 mx-auto">
            <h1 class="text-5xl text-center">{post.title}</h1>
            {getUserById(post.userId).then(
                (user) => user && <span>الكاتب: {user.name}</span>
            )}
            <div class="my-5">
                {
                    //categories
                    post.catrgories.map((category) => {
                        return (
                            <span
                                key={category.id}
                                class="bg-primary text-white px-2 py-1 mx-1 rounded-lg"
                            >
                                {category.name}
                            </span>
                        );
                    })
                }
            </div>
            <div
                class="mt-4 flex flex-col items-stretch"
                style={{ lineHeight: "1.8rem" }}
            >
                <p dangerouslySetInnerHTML={post.body}></p>
            </div>
            <span class="text-sm text-gray-500">
                {post?.createdAt && getArabicDateFormat(post.createdAt)}
            </span>
        </div>
    ) : null;
});

export const head: DocumentHead = ({ resolveValue, params }) => {
    const posts = resolveValue(usePostData);
    const title = posts.find((post) => post.id === params.blogId)?.title;
    return { title };
};
