import { Slot, component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useAuthSignin } from "~/routes/plugin@auth";
export const SigninForm = component$(
  ({ provider }: { provider: "google" | "github" }) => {
    const signin = useAuthSignin();

    return (
      <div
        class={`${
          provider === "github" ? "bg-gray-950" : "bg-blue-800"
        } text-2xl flex items-center justify-center text-center text-white py-3 px-4 rounded-xl mb-3`}
      >
        <Form action={signin}>
          <input type="hidden" name="providerId" value={provider} />
          <button class="flex items-center tex">
            <Slot /> <p class="ml-3">{provider}</p>
          </button>
        </Form>
      </div>
    );
  }
);
