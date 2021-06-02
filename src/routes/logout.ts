import type { RequestHandler } from "@sveltejs/kit";

export const post: RequestHandler = async (request) => {
  return {
    status: 303,
    headers: {
      location: "/login",
      "set-cookie": `token=d; path=/; max-age=0; same-site=strict;  HttpOnly`,
    },
  };
};
