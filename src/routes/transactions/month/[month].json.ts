import type { RequestHandler } from "@sveltejs/kit";
import type { Locals } from "$lib/types";
import { getUserTransactionForMonth } from "$lib/db";

export const get: RequestHandler<Locals> = async (request) => {
  if (!request.locals.userId) {
    return {
      status: 401,
    };
  }

  let monthKey = request.params.month;
  let transactions = await getUserTransactionForMonth(
    request.locals.userId,
    monthKey
  );
  return {
    status: 200,
    body: {
      data: transactions,
    },
  };
};
