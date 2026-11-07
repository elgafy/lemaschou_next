import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  // Fall back to the default locale when there is no locale context
  // (e.g. render outside the [locale] segment) instead of notFound()-ing,
  // which would break default-locale static rendering.
  const locale =
    requested && routing.locales.includes(requested as (typeof routing.locales)[number])
      ? requested
      : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
