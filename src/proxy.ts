import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse, NextRequest } from "next/server";

// next-intl 4's createMiddleware returns a NextResponse synchronously;
// custom middlewares may return a promise.
type Middleware = (
  request: NextRequest
) => NextResponse | undefined | Promise<NextResponse | undefined>;

function composeMiddlewares(...middlewares: Middleware[]) {
  return async function middleware(request: NextRequest) {
    for (const middleware of middlewares) {
      const response = await middleware(request);
      // Pass through the middleware's own response verbatim: it may be a
      // redirect/rewrite, or a next() response carrying headers/cookies
      // (next-intl sets the NEXT_LOCALE cookie on its next() responses).
      if (response) return response;
    }
    return NextResponse.next();
  };
}

export default composeMiddlewares(createMiddleware(routing));

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
