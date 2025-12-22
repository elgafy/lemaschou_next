import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import { getData, getMenuData } from "../actions";
import { MenuData, menuTypes } from "../AppTypes";
import ReduxContainer from "@/store/redux-container";
const MenuSection = dynamic(() => import("./components/MenuSection"));
export const revalidate = 30;
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
  const t = await getTranslations({ locale, namespace: "menuPage" });
  const data: menuTypes = await getData("pages/menu", locale);
  

  return {
    title: t("tab"),
    description: data?.desc_menu_seo,
    keywords: data?.keywords_menu_seo?.split(","),
    openGraph: {
      description: data?.desc_menu_seo,
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
export default async function Menu({ params: { locale } }: pageProps) {
  setRequestLocale(locale);

   async function fetchData() {
    return await fetch(process.env.BASE_URL + "pages/menu", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      },
    })
      .then((res) => res.json())
      .then((data) => data.data);
  }

  const data=await fetchData()
  const menuDataMeals: MenuData = await getMenuData("menu/request", locale);
  const isRamadan=data?.active_ramadan_menu==="1"


  return (
    <main className="w-full flex flex-col gap-0  relative ">
      <Hero locale={locale} meals={data?.default_meals} image={data?.image} isRamadan={isRamadan} />

      <ReduxContainer>
        <MenuSection menuData={menuDataMeals} isRamadan={isRamadan}/>
      </ReduxContainer>
    </main>
  );
}
