import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { getData, requestData } from "../../../actions";
import { ReservationType } from "../../../AppTypes";
import Image from "next/image";
import logoWord from "/public/assets/logo-word.svg";
import ReservationConfirmation from "../../../main-components/ReservationConfirmation";

export const revalidate = 10;

type pageProps = {
  params: {
    locale: string;
    reservation_id: string;
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
export default async function ReservationConfirmationPage({
  params: { locale, reservation_id },
}: pageProps) {
  setRequestLocale(locale);
  const reservationData = await requestData(`reservations/${reservation_id}`);
  const reservation = reservationData?.data ?? reservationData;
  const t = await getTranslations({ locale, namespace: "reservationPage" });

  const hasReservation = Boolean(reservation && Object.keys(reservation).length > 0 && reservation?.id);

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
      {hasReservation ? (
        <ReservationConfirmation reservation={reservation} />
      ) : (
        <div
          dir={locale === "en" ? "ltr" : "rtl"}
          className="flex flex-col items-center justify-center w-full gap-4 p-6 text-center"
        >
          <h4 className="text-3xl font-Rufina font-semibold text-mainColor">
            {t("reservationNotFound")}
          </h4>
        </div>
      )}
    </main>
  );
}
