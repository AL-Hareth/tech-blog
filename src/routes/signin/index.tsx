import { $, component$, useOnDocument } from "@builder.io/qwik";
import { BsGithub, BsGoogle } from "@qwikest/icons/bootstrap";
import { SigninForm } from "~/components/SigninForm";
import { useAuthSession } from "../plugin@auth";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
    const session = useAuthSession();
    const nav = useNavigate();

    useOnDocument(
        "load",
        $(async () => {
            if (session.value?.user) await nav("/");
        })
    );
    return (
        <>
            <div class="flex flex-col items-stretch container mx-auto p-4 ">
                {/* <SigninForm provider="google">
          <BsGoogle class="ml-2" />
        </SigninForm> */}
                <SigninForm provider="github">
                    <BsGithub class="ml-2" />
                </SigninForm>
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: "Sign in",
};
