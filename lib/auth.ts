// import Router from "next/router";
import nextCookie from "next-cookies";

export const auth = (ctx: any) => {
  const cookie = nextCookie(ctx);
  if ((ctx.req && !cookie) || (ctx.req && cookie && !cookie.qid)) {
    ctx.res.writeHead(302, { Location: "/auth/login" });
    ctx.res.end();
    return;
  }

  //   if (cookie || (cookie && !cookie.qid)) {
  //     Router.push("/auth/login");
  //   }

  return cookie.qid;
};
