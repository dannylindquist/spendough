import type { RequestHandler } from "@sveltejs/kit";
import { createTransaction } from "$lib/db";
import type { Locals } from "$lib/types";

export const post: RequestHandler<Locals> = async (request) => {
  if (!request.locals || !request.locals.userId) {
    return {
      status: 404,
      body: {
        error: "Not Authenticated",
      },
    };
  }

  const transaction = JSON.parse(request.rawBody as string);
  var date = new Date(transaction.timestamp);
  var month = Number(
    `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}`
  );

  transaction["month"] = month;
  transaction["timestamp"] = new Date(transaction.timestamp);

  let res = await createTransaction(request.locals.userId, transaction);
  if (!res) {
    return {
      status: 500,
      body: {
        data: "Unable to create",
      },
    };
  }

  return {
    status: 200,
    body: {
      data: res,
    },
  };
};
