import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { UserCard } from "~/components/UserCard";

import prisma from "~/lib/prisma";

export const useUsers = routeLoader$(async () => {
  return await prisma.user.findMany();
});

export default component$(() => {
  const users = useUsers();
  return (
    <>
      <h1 class="text-center mb-2">Users</h1>
      {users.value.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </>
  );
});

export const head: DocumentHead = {
  title: "Manage Users",
};
