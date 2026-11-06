import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
type props = {
  params: Promise<{ locale: string; rest: string[] }>;
};

export default async function CatchAllPage(props0: props) {
  const params = await props0.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);

  notFound();
}
