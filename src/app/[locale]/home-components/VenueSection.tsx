import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CustomLinkWithBG from "../main-components/CustomLinkWithBG";
import { HomeProps } from "../AppTypes";
import ReduxContainer from "@/store/redux-container";

type props = {
  images: HomeProps["venues"];
};

function VenueSection({ images }: props) {
  const t = useTranslations("homePage.venueSection");

  return (
    <section className="custom-container grid grid-cols-12 gap-6  ">
      <div className="flex flex-col col-span-10 col-start-2 gap-6 justify-between clg:col-span-12 clg:gap-[28px]">
        <div className="w-full flex flex-col gap-6 clg:items-center">
          <header className="w-full flex flex-col gap-4 text-center">
            <h1 className="font-Rufina font-normal text-[44px] text-mainColor w-full lMobile:text-3xl cll:text-3xl alg:text-4xl blg:text-2xl bxs:text-lg lMobile:px-3 ">
              {t("title")}
            </h1>
            <p className="text-mainColor text-[23px] font-light mobile:text-xs ss:text-sm cll:text-lg">
              {t("subtitle")}
            </p>
          </header>
          <ReduxContainer>
            <CustomLinkWithBG
              className="mx-auto"
              href="venue"
              title={t("link")}
            />
          </ReduxContainer>
        </div>
        <div className="flex flex-col w-full gap-3 mobile:gap-1">
          <div className="w-full grid grid-cols-3 gap-[50px] asm:gap-5 cll:gap-6 lMobile:relative lMobile:h-[332px] xs:h-[250px] ss:gap-3">
            <span className="hidden lMobile:block w-[141px] h-[110px] bg-mainColor rounded-lg absolute top-[15px] lMobile:left-5"></span>

            {images.map((item, index) => (
              <div
                className={`col-span-1 h-[206px] ss:h-[180px] bxs:h-[190] rounded-[8px] overflow-hidden relative lMobile:absolute ${
                  index === 0
                    ? "lMobile:bottom-2 lmb:!w-[120px] bxs:bottom-2 lMobile:h-[186px] left-0 bxs:h-[150px] z-10 xs:w-[140px]"
                    : index === 1
                    ? "lMobile:h-[256px] bxs:h-[190px] lMobile:left-[63px]"
                    : "lMobile:right-0 lMobile:h-[190px] bxs:h-[130px] z-10 bxs:top-[30px] lMobile:top-[42px] lmb:!w-[110px] xs:top-20 xs:w-[120px]"
                } lMobile:w-[200px] mobile:w-[170px] lmb:w-[140px]`}
                key={item?.id}
              >
                <Image
                  src={item?.image}
                  alt="image"
                  fill
                  sizes="180px"
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
          <hr className="h-[3px] bg-mainColor" />
        </div>
      </div>
    </section>
  );
}

export default VenueSection;
