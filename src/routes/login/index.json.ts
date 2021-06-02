import type { RequestHandler } from "@sveltejs/kit";
import type { Locals } from "$lib/types";
import { getUserByEmail } from "$lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const post: RequestHandler<Locals, FormData> = async (request) => {
  let email = request.body.get("email");
  let password = request.body.get("password");
  if (email && password) {
    let user = await getUserByEmail(email);
    if (!user) {
      return {
        status: 401,
        body: {
          data: {
            error: "Invalid email or password",
          },
        },
      };
    }
    let valid = await bcrypt.compare(password, user.password);
    if (valid) {
      let token = jwt.sign({ userId: user.id }, process.env["COOKIE_KEY"]);
      if (
        request.method !== "GET" &&
        request.headers.accept !== "application/json"
      ) {
        let date = new Date();
        return {
          status: 303,
          headers: {
            "set-cookie": `token=${token}; path=/; max-age=2592000; same-site=strict;  HttpOnly`,
            location: `/${date.getFullYear()}${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}`,
          },
        };
      }
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
    return {
      status: 401,
      body: {
        data: {
          error: "Invalid email or password",
        },
      },
    };
  }
};
