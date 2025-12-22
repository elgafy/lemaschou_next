import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import { venues } from "../AppTypes";
import { getData } from "../actions";

const ImagesGrid = dynamic(() => import("./components/ImagesGrid"));
const Events = dynamic(() => import("./components/Events"));
export const revalidate = 10;

type pageProps = {
  params: {
    locale: string;
  };
};
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
type MetaDataProps = {
  params: { locale: string };
};
export async function generateMetadata({
  params: { locale },
}: MetaDataProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "venuePage" });
  const data: venues = await getData("pages/venue", locale);

  return {
    title: t("tab"),
    description: data?.desc_venue_seo,

    keywords: data?.keywords_venue_seo?.split(","),
    openGraph: {
      description: data?.desc_venue_seo,
      title: t("tab"),
      type: "website",
      siteName: t("tab"),
      countryName: "Saudi Arabia",
      images: {
        url: "https://le-maschou.s3.me-central-1.amazonaws.com/uploads/venues/01JA80ND1ZCM27BHEGESGDAARX.png",
        alt: t("tab"),
        width: 1200,
        height: 630,
      },
    },
  };
}
export default async function Venue({ params: { locale } }: pageProps) {
  setRequestLocale(locale);
  const data: venues = await getData("pages/venue", locale);

  return (
    <main className="w-full flex flex-col gap-[104px] tablet:gap-11 pb-[124px] relative tablet:pb-8 cll:gap-16 ">
      <Hero text={data?.about} image={data?.about_image} />
      <ImagesGrid images={data?.gallery} />
      <Events events={data?.events} />
    </main>
  );
}
