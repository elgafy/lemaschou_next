"use client";

import CurrencySymbol from "@/components/ui/currencySymbol";
import {
  ArmchairIcon,
  CalendarDaysIcon,
  ClockIcon,
  UsersRoundIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ReservationSummaryWidget } from "./ReservationWidgetComponents";

const ReservationConfirmation = ({
  reservation,
  title,
  hint,
  failed = false,
  showRetry = false,
  retryHref,
}: {
  reservation: any;
  title?: string;
  hint?: string;
  failed?: boolean;
  showRetry?: boolean;
  retryHref?: string;
}) => {
  const t = useTranslations("reservationPage");
  const locale = useLocale();

  const dir = locale === "en" ? "ltr" : "rtl";

  const reference =
    reservation?.reservation_id ??
    reservation?.sevenrooms_reservation_id ??
    reservation?.id;
  const guestName =
    `${reservation?.first_name ?? ""} ${reservation?.last_name ?? ""}`.trim();
  const email = reservation?.email ?? reservation?.email_address;
  const phone = reservation?.mobile ?? reservation?.phone;
  const specialRequest =
    reservation?.special_request ?? reservation?.specialRequest;
  const occasion = reservation?.occasion_type ?? reservation?.occasionType;
  const seatingTime = reservation?.options?.seating_time ?? "";

  const order = reservation?.order ?? null;
  const orderItems = Array.isArray(order?.items) ? order?.items : [];

  const hasValue = (value: any) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim() !== "";
    return true;
  };

  const isZero = (value: any) =>
    !hasValue(value) || String(value).trim() === "0" || String(value).trim() === "0.00";

  // Strip trailing decimal zeros: "246.00" -> "246", "24.50" -> "24.5"
  const formatAmount = (value: any) => {
    if (value === null || value === undefined || value === "") return "";
    const num = typeof value === "number" ? value : parseFloat(String(value));
    if (Number.isNaN(num)) return String(value);
    return String(num);
  };

  const statusClasses = (status: any) => {
    switch (String(status ?? "").toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "unpaid":
      case "failed":
      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Map raw payment statuses to translation keys. Unknown statuses fall back
  // to the raw value with its first letter capitalised.
  const PAYMENT_STATUS_KEYS: Record<string, string> = {
    paid: "statusPaid",
    completed: "statusCompleted",
    success: "statusSuccess",
    pending: "statusPending",
    failed: "statusFailed",
    unpaid: "statusUnpaid",
    cancelled: "statusCancelled",
    canceled: "statusCancelled",
    expired: "statusExpired",
  };

  const statusLabel = (status: any) => {
    const raw = String(status ?? "").trim();
    if (!raw) return "";
    const key = PAYMENT_STATUS_KEYS[raw.toLowerCase()];
    if (key) return t(key);
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  };

  return (
    <div className="content w-[90vw] max-w-[800px] flex flex-col items-center justify-center my-[104px] gap-12 clg:my-5">
      <div className="theme-border bg-[#e5cbbd] flex flex-col gap-4 p-8 tablet:p-0 w-full reservation-widget relative">
        <h2 className="text-3xl text-center font-Rufina font-semibold">
          {t("widgetTitle")}
        </h2>

        <div className="w-full flex flex-col gap-1 mb-4 animated zoomIn">
          <h4
            className={`text-xl font-semibold text-center mb-4 ${
              failed ? "text-red-600" : ""
            }`}
          >
            {failed ? t("bookingFailedTitle") : t("bookingDetails")}
          </h4>
          <div className="w-full flex flex-col gap-1">
            <div className="w-full flex flex-wrap gap-1 justify-center">
              <ReservationSummaryWidget
                title={t("guests")}
                value={String(reservation?.guests_count ?? "")}
                subtitle={""}
                icon={<UsersRoundIcon />}
              />
              <ReservationSummaryWidget
                title={t("date")}
                value={reservation?.date ?? ""}
                subtitle={""}
                icon={<CalendarDaysIcon />}
              />
              <ReservationSummaryWidget
                title={t("time")}
                value={reservation?.time ?? ""}
                subtitle={""}
                icon={<ClockIcon />}
              />
              <ReservationSummaryWidget
                title={t("seating")}
                value={seatingTime}
                subtitle={""}
                icon={<ArmchairIcon />}
              />
            </div>
          </div>
        </div>

        <div
          dir={dir}
          className="flex flex-col items-center justify-center w-full gap-4 bg-white theme-border rounded-lg shadow-md flex-1 p-2"
        >
          <h4 className="text-3xl text-center font-Rufina font-semibold text-mainColor">
            {title ?? t("reservationSuccessTitle")}
          </h4>

          {hint ? (
            <p
              dir={dir}
              className="text-base text-center text-[#5C6574] sm:text-sm"
            >
              {hint}
            </p>
          ) : null}

          {showRetry && retryHref ? (
            <a
              href={retryHref}
              className="inline-flex items-center justify-center px-6 py-2 rounded bg-mainColor text-white text-base font-semibold hover:opacity-90 transition"
            >
              {t("retryPayment")}
            </a>
          ) : null}

          {reference ? (
            <div dir={dir} className="flex justify-start w-full sm:flex-col gap-2">
              <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">
                {t("reservationReference")}
              </p>
              <p className="text-base sm:text-base">{reference}</p>
            </div>
          ) : null}

          {guestName ? (
            <div dir={dir} className="flex justify-start w-full sm:flex-col gap-2">
              <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">
                {t("reservationFor")}
              </p>
              <p className="text-base sm:text-base">{guestName}</p>
            </div>
          ) : null}

          {reservation?.date ? (
            <div dir={dir} className="flex justify-start w-full sm:flex-col gap-2">
              <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">
                {t("reservationDate")}
              </p>
              <p className="text-base sm:text-base">{reservation?.date}</p>
            </div>
          ) : null}

          {reservation?.time ? (
            <div dir={dir} className="flex justify-start w-full sm:flex-col gap-2">
              <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">
                {t("reservationTime")}
              </p>
              <p className="text-base sm:text-base">{reservation?.time}</p>
            </div>
          ) : null}

          {reservation?.guests_count ? (
            <div dir={dir} className="flex justify-start w-full sm:flex-col gap-2">
              <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">
                {t("guests")}
              </p>
              <p className="text-base sm:text-base">
                {reservation?.guests_count}
              </p>
            </div>
          ) : null}

          {email ? (
            <div dir={dir} className="flex justify-start w-full sm:flex-col gap-2">
              <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">
                {t("email")}
              </p>
              <p className="text-base sm:text-base">{email}</p>
            </div>
          ) : null}

          {phone ? (
            <div dir={dir} className="flex justify-start w-full sm:flex-col gap-2">
              <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">
                {t("phone")}
              </p>
              <p className="text-base sm:text-base">{phone}</p>
            </div>
          ) : null}

          {specialRequest ? (
            <div dir={dir} className="flex justify-start w-full sm:flex-col gap-2">
              <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">
                {t("specialRequest")}
              </p>
              <p className="text-base sm:text-base">{specialRequest}</p>
            </div>
          ) : null}

          {occasion ? (
            <div dir={dir} className="flex justify-start w-full sm:flex-col gap-2">
              <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">
                {t("occasion")}
              </p>
              <p className="text-base sm:text-base">{occasion}</p>
            </div>
          ) : null}

          {order ? (
            <div dir={dir} className="flex flex-col w-full gap-2 pt-2">
              <h5 className="text-xl font-semibold w-full">
                {t("orderDetails")}
              </h5>

              {orderItems.length ? (
                <div className="flex flex-col w-full gap-2">
                  {orderItems.map((item: any, index: number) => (
                    <div
                      key={`${item?.name ?? "item"}-${index}`}
                      className="flex justify-between items-center w-full sm:flex-col sm:items-start gap-2"
                    >
                      <p className="text-base sm:text-base flex items-center gap-1">
                        <span>{item?.name ?? ""}</span>
                        <span>x{item?.quantity ?? 0}</span>
                      </p>
                      <p className="text-base sm:text-base flex items-center gap-1">
                        <CurrencySymbol />
                        {formatAmount(item?.total ?? item?.sub_total)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {hasValue(order?.subtotal) ? (
                <div
                  dir={dir}
                  className="flex justify-between items-center w-full sm:flex-col sm:items-start gap-2"
                >
                  <p className="font-semibold text-base sm:text-base">
                    {t("subtotal")}
                  </p>
                  <p className="text-base sm:text-base flex items-center gap-1">
                    <CurrencySymbol />
                    {formatAmount(order?.subtotal)}
                  </p>
                </div>
              ) : null}

              {!isZero(order?.discount) ? (
                <div
                  dir={dir}
                  className="flex justify-between items-center w-full sm:flex-col sm:items-start gap-2"
                >
                  <p className="font-semibold text-base sm:text-base">
                    {t("discount")}
                  </p>
                  <p className="text-base sm:text-base flex items-center gap-1">
                    <CurrencySymbol />
                    {formatAmount(order?.discount)}
                  </p>
                </div>
              ) : null}

              {!isZero(order?.deposit) ? (
                <div
                  dir={dir}
                  className="flex justify-between items-center w-full sm:flex-col sm:items-start gap-2"
                >
                  <p className="font-semibold text-base sm:text-base">
                    {t("deposit")}
                  </p>
                  <p className="text-base sm:text-base flex items-center gap-1">
                    <CurrencySymbol />
                    {formatAmount(order?.deposit)}
                  </p>
                </div>
              ) : null}

              {hasValue(order?.total) ? (
                <div
                  dir={dir}
                  className="flex justify-between items-center w-full sm:flex-col sm:items-start gap-2"
                >
                  <p className="font-semibold text-base sm:text-base">
                    {t("totalPrice")}
                  </p>
                  <p className="font-semibold text-base sm:text-base flex items-center gap-1">
                    <CurrencySymbol />
                    {formatAmount(order?.total)}
                  </p>
                </div>
              ) : null}

              {hasValue(order?.status) ? (
                <div
                  dir={dir}
                  className="flex justify-between items-center w-full sm:flex-col sm:items-start gap-2"
                >
                  <p className="font-semibold text-base sm:text-base">
                    {t("paymentStatus")}
                  </p>
                  <p className="text-base sm:text-base">
                    <span
                      className={`px-3 py-1 rounded-full text-base font-semibold ${statusClasses(
                        order?.status
                      )}`}
                    >
                      {statusLabel(order?.status)}
                    </span>
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}

        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmation;
