import {
  $,
  type QwikChangeEvent,
  component$,
  Resource,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { ROLE } from "@prisma/client";
import { server$, useNavigate } from "@builder.io/qwik-city";
import prisma from "~/lib/prisma";
import useCurrentUser from "~/lib/useCurrentUser";

type CardProps = {
  id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
  role: ROLE;
};

export const changeRole = server$(async (data) => {
  await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      role: data.role,
    },
  });
});

export const UserCard = component$<CardProps>(
  ({ id, name, email, image, role }) => {
    const user = useCurrentUser();
    const nav = useNavigate();

    useVisibleTask$(() => {
      user.value.then(async (userData) => {
        if (userData && userData.role !== "ADMIN") {
          await nav("/");
        }
      });
    });

    const handleChangeRole = $((e: QwikChangeEvent) => {
      if (id) {
        changeRole({
          id,
          role: (e.target as HTMLSelectElement).value as ROLE,
        });
      }
    });
    return (
      <div class="mt-3 bg-base-300 px-4 py-2 rounded-lg flex items-center justify-between">
        <div class="flex items-center">
          <img
            class="rounded-full"
            alt="profile"
            src={image ? image : ""}
            width={50}
            height={50}
          />
          <div class="mx-4">
            <h2>{name}</h2>
            <span>{email}</span>
          </div>
          <div class="text-red-400">{role}</div>
        </div>
        <Resource
          value={user}
          onResolved={(userData) => {
            if (userData && userData.role === "ADMIN") {
              if (role !== "ADMIN") {
                return (
                  <select
                    onChange$={handleChangeRole}
                    class="select select-primary w-full max-w-xs justify-self-end"
                  >
                    <option disabled selected>
                      Change Role
                    </option>
                    {["READER", "WRITER", "ADMIN"].map((value) => (
                      <option value={value} key={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                ) as any;
              }
            }

            return null;
          }}
        />

        {role !== "ADMIN" && (
          <select
            onChange$={handleChangeRole}
            class="select select-primary w-full max-w-xs justify-self-end"
          >
            <option disabled selected>
              Change Role
            </option>
            {["READER", "WRITER", "ADMIN"].map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }
);
