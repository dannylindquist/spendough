import type { Locals } from "$lib/types";
import type { RequestHandler } from "@sveltejs/kit";
import { createUser } from "$lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const post: RequestHandler<Locals, FormData> = async (request) => {
  let email = request.body.get("email");
  let password = request.body.get("password");
  let confirmation = request.body.get("password-confirm");

  if (email && password && confirmation) {
    if (password !== confirmation) {
      return {
        status: 403,
        body: {
          data: {
            error: "Passwords don't match",
          },
        },
      };
    }
    let hashed = await bcrypt.hash(password, 10);
    let user = await createUser(email, hashed);
    if (user !== null) {
      let token = jwt.sign({ userId: user.id }, process.env["COOKIE_KEY"]);
      let date = new Date();
      return {
        status: 200,
        headers: {
          "set-cookie": `token=${token}; path=/; max-age=2592000; same-site=strict;  HttpOnly`,
        },
        body: {
          data: {
            message: "success",
          },
        },
      };
    }
  }

  return {
    status: 403,
    body: {
      data: {
        error: "User already exists",
      },
    },
  };
};
