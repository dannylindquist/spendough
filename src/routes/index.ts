import type { Locals } from "$lib/types";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler<Locals> = async (request) => {
  if (!request.locals || !request.locals.userId) {
    return {
      status: 303,
      headers: {
        location: "/login",
      },
    };
  }
  console.log("redirect");
  let date = new Date();
  return {
    status: 303,
    headers: {
      location: `/${date.getFullYear()}${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
    },
  };
};
