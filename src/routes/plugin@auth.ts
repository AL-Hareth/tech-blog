import { serverAuth$ } from "@builder.io/qwik-auth";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { Adapter } from "@auth/core/adapters";
import type { Provider } from "@auth/core/providers";
import prisma from "~/lib/prisma";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    adapter: PrismaAdapter(prisma) as Adapter,
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    providers: [
      GitHub({
        clientId: env.get("GITHUB_ID")!,
        clientSecret: env.get("GITHUB_SECRET")!,
      }),
      Google({
        clientId: env.get("GOOGLE_CLIENT_ID")!,
        clientSecret: env.get("GOOGLE_CLIENT_SECRET")!,
      }),
    ] as Provider[],
  }));
