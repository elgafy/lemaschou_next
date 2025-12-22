import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
type props = {
  params: { locale: string; rest: string[] };
};

export default function CatchAllPage({ params: { locale } }: props) {
  setRequestLocale(locale);

  notFound();
}
