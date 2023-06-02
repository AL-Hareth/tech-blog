import { ResourceReturn, useResource$ } from "@builder.io/qwik";
import { useAuthSession } from "~/routes/plugin@auth";
import prisma from "./prisma";
import { User } from "@prisma/client";
import { server$ } from "@builder.io/qwik-city";

export const getUser = server$(async (email: string) => {
  return await prisma.user.findUnique({
      where: {
        email
      }
    })
})

export default function useCurrentUser(): ResourceReturn<User | null> {
  const sesssion = useAuthSession();
  const userRes = useResource$(async () => {
    if(sesssion.value?.user?.email) {
      return await getUser(sesssion.value.user.email);
    }
    return null;
  });
  return userRes;
}