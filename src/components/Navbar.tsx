import {
    component$,
    useSignal,
    useOnWindow,
    $,
    useResource$,
    Resource,
} from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import prisma from "~/lib/prisma";
import { useAuthSession, useAuthSignout } from "~/routes/plugin@auth";

export const Navbar = component$(() => {
    const session = useAuthSession();
    const signout = useAuthSignout();
    const currentUser = useResource$(async () => {
        if (session.value?.user?.email) {
            return await prisma.user.findUnique({
                where: {
                    email: session.value.user.email,
                },
            });
        }
        return null;
    });
    const navbar = useSignal<HTMLElement>();
    useOnWindow(
        "scroll",
        $(() => {
            if (window.scrollY > 1) {
                navbar.value?.classList.replace("bg-transparent", "bg-base-300");
            } else {
                navbar.value?.classList.replace("bg-base-300", "bg-transparent");
            }
        })
    );

    return (
        <div ref={navbar} class={`navbar bg-base-300 fixed top-0 z-10`}>
            <div class="navbar-start">
                <div class="dropdown">
                    <label tabIndex={0} class="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
                    >
                        {
                            <Resource
                                value={currentUser}
                                onResolved={(user) =>
                                    user && ["WRITER", "ADMIN"].includes(user.role) ? (
                                        <>
                                            <li>
                                                <Link href="/admin/blogs/create">كتابة مقال</Link>
                                            </li>
                                            <li>
                                                <Link href="/admin/blogs/my-blogs">مقالاتي</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <></>
                                    )
                                }
                            />
                        }
                        <li>
                            <Link href="/blogs">المقالات</Link>
                        </li>
                    </ul>
                </div>
                <Link href="/" class="btn btn-ghost normal-case text-xl">
                    شبكة المطورين
                </Link>
            </div>
            <div class={"navbar-center hidden lg:flex"}>
                <ul class="menu menu-horizontal px-1">
                    {
                        <Resource
                            value={currentUser}
                            onResolved={(user) =>
                                user && ["WRITER", "ADMIN"].includes(user.role) ? (
                                    <>
                                        <li>
                                            <Link href="/admin/blogs/create">كتابة مقال</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/blogs/my-blogs"> مقالاتي</Link>
                                        </li>
                                    </>
                                ) : (
                                    <></>
                                )
                            }
                        />
                    }
                    <li>
                        <Link href="/blogs">المقالات</Link>
                    </li>
                </ul>
            </div>
            <div class="navbar-end">
                {!session.value?.user ? (
                    <Link
                        class="btn-outline btn bg-gray-800/80"
                        href="/signin"
                    >
                        Sign in
                    </Link>
                ) : (
                    <Form action={signout}>
                        <button class=" btn bg-red-900 text-white">Sign out</button>
                    </Form>
                )}
            </div>
        </div>
    );
});
