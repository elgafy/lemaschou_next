import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse, NextRequest } from "next/server";

type Middleware = (request: NextRequest) => Promise<NextResponse | undefined>;

function composeMiddlewares(...middlewares: Middleware[]) {
  return async function (request: NextRequest) {
    for (const middleware of middlewares) {
      const response = await middleware(request);

      if (response && response !== NextResponse.next()) {
        return response;
      }
    }
    return NextResponse.next();
  };
}

const localeMiddleware: Middleware = async (request: NextRequest) => {
  const response = createMiddleware(routing)(request);
  return response;
};

export const middleware = composeMiddlewares(localeMiddleware);

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
