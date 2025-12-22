import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CustomLinkWithBG from "../main-components/CustomLinkWithBG";
import ReduxContainer from "@/store/redux-container";

type props = {
  bgImg: string;
  bgText: string;
};
function MenuSection({ bgImg, bgText }: props) {
  const t = useTranslations("homePage.menuSection");

  return (
    <section className="w-full flex flex-col">
      <div className="menuSectionHome min-h-screen relative w-full flex flex-col items-center justify-center gap-[35px] ss:gap-7 lMobile:pt-16  pt-20  ">
        <Image
          src={bgImg}
          alt="menu image"
          className=" top-0 left-0 -z-10 w-full object-cover "
          sizes="100vw"
          fill
        />

        <div className="w-[70%] lMobile:w-[80%] flex flex-col items-center">
          <header>
            <h2 className="font-Rufina font-normal text-[48px] text-white text-center  lMobile:text-2xl ss:!text-lg tablet:text-3xl lg:text-5xl tablet:leading-snug xl:text-6xl bxs:text-lg xs:text-base w-full lMobile:font-semibold">
              {bgText}
            </h2>
          </header>
        </div>
        <ReduxContainer>
          <CustomLinkWithBG title={t("link")} href="menu" />
        </ReduxContainer>
        <div className="flex flex-col gap-5 items-center  absolute bottom-0 ">
          <span className="text-3xl font-Rufina text-white font-bold ss:text-xl bxs:text-base xll:text-4xl">
            {t("faq")}
          </span>
          <ReduxContainer>
            <CustomLinkWithBG title={t("faqsLink")} href="faqs" />
          </ReduxContainer>
        </div>
      </div>
    </section>
  );
}

export default MenuSection;
