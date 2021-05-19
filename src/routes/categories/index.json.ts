import type { RequestHandler } from "@sveltejs/kit";
import type { Locals } from "$lib/types";
import { getUserCategories } from "$lib/db";

export const get: RequestHandler<Locals> = async (request) => {
  if (!request.locals.userId) {
    return {
      status: 404,
      body: {
        message: "Not authenticated",
      },
    };
  }
  let categories = await getUserCategories(request.locals.userId);
  return {
    status: 200,
    body: {
      data: categories,
    },
  };
};
