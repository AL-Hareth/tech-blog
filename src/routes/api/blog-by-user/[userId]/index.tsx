import type { RequestHandler } from "@builder.io/qwik-city";
import prisma from "~/lib/prisma";

// GET /api/blog-by-user/:id {get aaaall post created by a user}
export const onGet: RequestHandler = async (req) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.userId,
    },
  });
  const posts =
    user &&
    (await prisma.post.findMany({
      where: {
        userId: user.id,
      },
    }));
  req.json(200, posts);
};
