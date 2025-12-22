import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getData } from "../actions";
import { FAQStype } from "../AppTypes";
import styles from "./styles.module.css";
const Hero = dynamic(() => import("./components/Hero"));
const FAQS = dynamic(() => import("../home-components/FAQS"));

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
  const t = await getTranslations({ locale, namespace: "menuPage" });
  const data: FAQStype = await getData("pages/faqs", locale);

  return {
    title: t("tab"),
    description: data?.desc_faq_seo,
    openGraph: {
      description: data?.desc_faq_seo,
      title: t("tab"),
      type: "website",
      siteName: t("tab"),
      countryName: "Saudi Arabia",
      images: {
        url: "https://le-maschou.s3.me-central-1.amazonaws.com/uploads/venues/01JA80Y8TB5ZHGPJZS3CH09KA9.png",
        alt: t("tab"),
        width: 1200,
        height: 630,
      },
    },
  };
}
export default async function FAQ({ params: { locale } }: pageProps) {
  setRequestLocale(locale);
  const data: FAQStype = await getData("pages/faqs", locale);

  return (
    <main className={styles.faqsSection}>
      <Hero />
      <FAQS faqs={data?.faqs} />
    </main>
  );
}
