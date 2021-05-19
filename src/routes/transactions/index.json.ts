import type { RequestHandler } from "@sveltejs/kit";
import {} from "$lib/db";

export const post: RequestHandler = async (request) => {
  return {
    status: 200,
  };
};
