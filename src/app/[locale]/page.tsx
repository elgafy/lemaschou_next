import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { getData } from "./actions";
import { HomeProps } from "./AppTypes";
import Hero from "./home-components/Hero";
const VenueSection = dynamic(
  () => import("@/app/[locale]/home-components/VenueSection")
);
const Testimonials = dynamic(
  () => import("@/app/[locale]/home-components/Testimonials")
);
const MenuSection = dynamic(
  () => import("@/app/[locale]/home-components/MenuSection")
);
type props = {
  params: { locale: string };
};
type MetadataProps = {
  params: { locale: string };
};
export const revalidate = 0;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: MetadataProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "homePage" });
  const data: HomeProps = await getData("pages/home", locale);

  return {
    title: t("tab"),
    description: data?.desc_home_seo,

    keywords: data?.keywords_home_seo?.split(","),
    openGraph: {
      description: data?.desc_home_seo,
      title: t("tab"),
      type: "website",
      siteName: t("tab"),
      countryName: "Saudi Arabia",
      images: {
        url: "https://le-maschou.s3.me-central-1.amazonaws.com/uploads/venues/01JA820VTVDR6Z6H7A21P1YHFT.png",
        alt: t("tab"),
        width: 1200,
        height: 630,
      },
    },
  };
}

export default async function Home({ params: { locale } }: props) {
  setRequestLocale(locale);
  const data: HomeProps = await getData("pages/home", locale);

  return (
    <main className="w-full flex flex-col overflow-hidden tablet:gap-[38px] clg:gap-5 cll:gap-7 xl:gap-20 xlll:gap-10 relative">
      <Hero reservationLink={data?.reservation_link} videoData={data?.video} />

      <VenueSection images={data?.venues} />
      <Testimonials testimonials={data?.testimonials} />
      <MenuSection bgImg={data?.menu_image} bgText={data?.menu_text} />
    </main>
  );
}
