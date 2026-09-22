import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { isPaidStatus } from "@/lib/reservationStatus";
import { getData, requestData } from "../../../actions";
import { ReservationType } from "../../../AppTypes";
import Image from "next/image";
import logoWord from "/public/assets/logo-word.svg";
import ReservationConfirmation from "../../../main-components/ReservationConfirmation";
import ReservationRedirect from "../../../main-components/ReservationRedirect";

// Reservation ids are only known at request time, so this route must be
// rendered on demand. Without this it is treated as SSG with no
// pre-generated pages, which 404s on some Node hosts (e.g. Plesk).
export const dynamic = "force-dynamic";

type pageProps = {
  params: {
    locale: string;
    reservation_id: string;
  };
};
type MetaDataProps = {
  params: { locale: string };
};
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
export default async function ReservationPaymentFailedPage({
  params: { locale, reservation_id },
}: pageProps) {
  setRequestLocale(locale);
  const reservationData = await requestData(`reservations/${reservation_id}`);
  const reservation = reservationData?.data ?? reservationData;
  // retryPaymentUrl is a top-level sibling of `data` in the API response.
  const retryPaymentUrl = reservationData?.retryPaymentUrl;
  const t = await getTranslations({ locale, namespace: "reservationPage" });

  const hasReservation = Boolean(
    reservation && Object.keys(reservation).length > 0 && reservation?.id
  );

  // Payment succeeded -> render a spinner and navigate to the confirmation page
  // client-side (avoids the blank screen caused by a server-side HTTP redirect).
  // Any other status (pending/unknown) renders here as-is.
  if (hasReservation && isPaidStatus(reservation?.order?.status)) {
    return (
      <ReservationRedirect
        href={`/${locale}/reservation/${reservation_id}/confirmation`}
      />
    );
  }

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
        <ReservationConfirmation
          reservation={reservation}
          title={t("paymentFailed")}
          hint={t("paymentFailedHint")}
          failed
          showRetry
          retryHref={retryPaymentUrl}
        />
      ) : (
        <div className="content w-[90vw] max-w-[800px] flex flex-col items-center justify-center my-[104px] gap-12 clg:my-5">
          <div className="theme-border bg-[#e5cbbd] flex flex-col gap-4 p-8 tablet:p-0 w-full reservation-widget relative">
            <h2 className="text-3xl text-center font-Rufina font-semibold">
              {t("reservationNotFound")}
            </h2>
          </div>
        </div>
      )}
    </main>
  );
}
