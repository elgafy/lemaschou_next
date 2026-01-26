import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { NextIntlClientProvider } from "next-intl";


import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "./main-components/Navbar";
import dynamic from "next/dynamic";
import { getData } from "./actions";
import { Settings } from "./AppTypes";
import AdComponent from "./main-components/AdComponent";
import ReduxContainer from "@/store/redux-container";
import MicrosoftClarity from "../Metrics/MicrosoftClarity";
const Footer = dynamic(() => import("./main-components/Footer"));
export const revalidate = 0;
const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["latin"] });
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
type MetadataProps = {
  params: { locale: string };
};
export async function generateMetadata({
  params: { locale },
}: MetadataProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "index" });

  return {
    title: {
      default: t("tab"),
      template: "%s | " + t("tab"),
    },
    icons: {
      icon: "/favicon.ico",
    },
    description: t("description"),
    openGraph: {
      description: t("description"),
      title: t("tab"),
      type: "website",
      siteName: t("tab"),
      countryName: "Saudi Arabia",
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  setRequestLocale(locale);
  const settings: Settings = await getData("settings/all", locale);
  const footer = settings.footer;
  const ads = settings.ads;
  const reservationSettings = settings.reservation;

  return (
    <html
      className="scroll-smooth"
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
    >
      <body
        className={` bg-[#E9DED7] ${
          locale === "ar" ? cairo.className : inter.className
        } 
         relative `}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {ads?.ad_pages.length > 0 && (
            <ReduxContainer>
              <AdComponent locale={locale} ads={ads} />
            </ReduxContainer>
          )}
          <ReduxContainer>
            <Navbar reservationSettings={reservationSettings} />
          </ReduxContainer>
          {children}
          <Footer
            phone={footer?.phone}
            address={footer?.address}
            email={footer?.email}
            instagram={footer?.instagram}
            working_from={footer?.from}
            working_to={footer?.to}
          />
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics
        gaId="G-XPTHTGL9BK"
        dataLayerName="dataLayer"
        debugMode={false}
      />
      <MicrosoftClarity />
    </html>
  );
}
