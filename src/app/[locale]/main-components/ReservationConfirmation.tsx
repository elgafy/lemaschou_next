"use client";

import { useLocale, useTranslations } from "next-intl";

const ReservationConfirmation = ({ reservation }: { reservation: any }) => {
    const t = useTranslations("reservationPage");
    const locale = useLocale();

    const reference =
      reservation?.reservation_id ??
      reservation?.sevenrooms_reservation_id ??
      reservation?.id;
    const guestName = `${reservation?.first_name ?? ""} ${reservation?.last_name ?? ""}`.trim();
    const email = reservation?.email ?? reservation?.email_address;
    const phone = reservation?.mobile ?? reservation?.phone;
    const specialRequest = reservation?.special_request ?? reservation?.specialRequest;
    const occasion = reservation?.occasion_type ?? reservation?.occasionType;

    return (
        <div
            dir={locale === "en" ? "ltr" : "rtl"}
            className="flex flex-col items-center justify-center w-full gap-4 bg-white theme-border rounded-lg shadow-md flex-1 p-6"
        >
            <h4
                dir={locale === "en" ? "ltr" : "rtl"}
                className="text-3xl text-center font-Rufina font-semibold text-mainColor"
            >
                {t("reservationSuccessTitle")}
            </h4>

            {reference ? (
                <div dir={locale === "en" ? "ltr" : "rtl"} className="flex justify-start w-full sm:flex-col gap-2">
                    <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Reservation Reference: </p>
                    <p className="text-base sm:text-base">{reference}</p>
                </div>
            ) : null}

            {guestName ? (
                <div dir={locale === "en" ? "ltr" : "rtl"} className="flex justify-start w-full sm:flex-col gap-2">
                    <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Reservation for: </p>
                    <p className="text-base sm:text-base">{guestName}</p>
                </div>
            ) : null}

            {reservation?.date ? (
                <div dir={locale === "en" ? "ltr" : "rtl"} className="flex justify-start w-full sm:flex-col gap-2">
                    <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Reservation Date: </p>
                    <p className="text-base sm:text-base">{reservation?.date}</p>
                </div>
            ) : null}

            {reservation?.time ? (
                <div dir={locale === "en" ? "ltr" : "rtl"} className="flex justify-start w-full sm:flex-col gap-2">
                    <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Reservation Time: </p>
                    <p className="text-base sm:text-base">{reservation?.time}</p>
                </div>
            ) : null}

            {reservation?.guests_count ? (
                <div dir={locale === "en" ? "ltr" : "rtl"} className="flex justify-start w-full sm:flex-col gap-2">
                    <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Guests: </p>
                    <p className="text-base sm:text-base">{reservation?.guests_count}</p>
                </div>
            ) : null}

            {email ? (
                <div dir={locale === "en" ? "ltr" : "rtl"} className="flex justify-start w-full sm:flex-col gap-2">
                    <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Email: </p>
                    <p className="text-base sm:text-base">{email}</p>
                </div>
            ) : null}

            {phone ? (
                <div dir={locale === "en" ? "ltr" : "rtl"} className="flex justify-start w-full sm:flex-col gap-2">
                    <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Phone: </p>
                    <p className="text-base sm:text-base">{phone}</p>
                </div>
            ) : null}

            {specialRequest ? (
                <div dir={locale === "en" ? "ltr" : "rtl"} className="flex justify-start w-full sm:flex-col gap-2">
                    <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Special Request: </p>
                    <p className="text-base sm:text-base">{specialRequest}</p>
                </div>
            ) : null}

            {occasion ? (
                <div dir={locale === "en" ? "ltr" : "rtl"} className="flex justify-start w-full sm:flex-col gap-2">
                    <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Occasion: </p>
                    <p className="text-base sm:text-base">{occasion}</p>
                </div>
            ) : null}
        </div>
    );
};

export default ReservationConfirmation;
