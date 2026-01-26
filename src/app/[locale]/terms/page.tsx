import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { getData } from "../actions";
import { TermsType } from "../AppTypes";

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
//   const t = await getTranslations({ locale, namespace: "termsPage" });
  const data: TermsType = await getData("pages/terms", locale);

  return {
    title: data?.title,
    description: data?.desc_terms_seo,
    openGraph: {
      description: data?.desc_terms_seo,
      title: data?.title,
      type: "website",
      siteName: data?.title,
      countryName: "Saudi Arabia",
      images: {
        url: "https://le-maschou.s3.me-central-1.amazonaws.com/uploads/venues/01JA80Y8TB5ZHGPJZS3CH09KA9.png",
        alt: data?.title,
        width: 1200,
        height: 630,
      },
    },
  };
}
export default async function Terms({ params: { locale } }: pageProps) {

  setRequestLocale(locale);
  const data: TermsType = await getData("pages/terms", locale);
  return (
    <main className="flex flex-col justify-center items-center pt-40 terms-page">
        <div className="w-[80%] flex flex-col justify-center items-center gap-8 mb-16">
          <h2 className="text-5xl font-semibold font-Rufina ss:text-xl ltablet:text-3xl">{data?.title}</h2>
        <div className="w-full" dangerouslySetInnerHTML={{ __html: data?.content}} />
        </div>
    </main>
  );
}