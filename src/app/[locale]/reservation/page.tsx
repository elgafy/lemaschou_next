import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { getData } from "../actions";
import { ReservationType } from "../AppTypes";
import Image from "next/image";
import logoWord from "/public/assets/logo-word.svg";
import ReservationWidget from "../main-components/ReservationWidget";

export const revalidate = 10;

type pageProps = {
  params: {
    locale: string;
  };
};
type MetaDataProps = {
  params: { locale: string };
};
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params: { locale },
}: MetaDataProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "reservationPage" });
  const data: ReservationType = await getData("pages/reservation", locale);

  return {
    title: t("title"),
    description: data?.desc_reservation_seo,
    openGraph: {
      description: data?.desc_reservation_seo,
      title: t("title"),
      type: "website",
      siteName: t("title"),
      countryName: "Saudi Arabia",
      images: {
        url: "https://le-maschou.s3.me-central-1.amazonaws.com/uploads/venues/01JA80Y8TB5ZHGPJZS3CH09KA9.png",
        alt: t("title"),
        width: 1200,
        height: 630,
      },
    },
  };
}
export default async function Reservation({ params: { locale } }: pageProps) {

  setRequestLocale(locale);
  const reservationSettings = await getData("reservations/settings", locale);

  return (
    <main className="flex flex-col justify-center items-center reservation-container pt-32">
      <div className="header"></div>
        <Image
        priority
        src={logoWord}
        alt="logo word image"
        sizes="(max-width: 600px) 186px, 447px"
        className="mobile:w-[80%] bxs:w-[70%]"
        />
        <ReservationWidget settings={reservationSettings} />
    </main>
  );
}