import cookie from "cookie";
import jwt from "jsonwebtoken";
import type { Handle, GetSession } from "@sveltejs/kit";

export const handle: Handle = async ({ request, render }) => {
  const cookies = cookie.parse(request.headers.cookie || "");
  if (cookies.token) {
    let token = jwt.verify(cookies.token, process.env["COOKIE_KEY"]) as object;
    request.locals.userId = +token["userId"];
  }

  if (request.query.has("_method")) {
    request.method = request.query.get("_method").toUpperCase();
  }

  const response = await render(request);

  return response;
};

export const getSession: GetSession = async (request) => {
  return {
    signedIn: request.locals.userId ? true : false,
  };
};
