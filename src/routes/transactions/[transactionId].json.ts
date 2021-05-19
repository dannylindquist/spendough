import type { Locals } from "$lib/types";
import type { RequestHandler } from "@sveltejs/kit";
import { getUserTransaction, updateTransaction } from "$lib/db";

export const get: RequestHandler<Locals> = async (request) => {
  if (!request.locals || !request.locals.userId) {
    return {
      status: 404,
      body: {
        error: "Not Authenticated",
      },
    };
  }
  let transaction = await getUserTransaction(
    request.locals.userId,
    +request.params.transactionId
  );
  return {
    body: {
      data: transaction,
    },
  };
};

export const patch: RequestHandler<Locals> = async (request) => {
  console.log(request.rawBody);
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

  let res = await updateTransaction(
    request.locals.userId,
    +request.params.transactionId,
    transaction
  );

  return {
    status: 200,
    body: {
      data: res,
    },
  };
};
