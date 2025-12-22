"use client";
import React from "react";
import { useTranslations } from "next-intl";
import CustomLinkWithBG from "../main-components/CustomLinkWithBG";
import ReduxContainer from "@/store/redux-container";

type props = {
  videoData: string;
  reservationLink: string;
};

function Hero({ videoData, reservationLink }: props) {
  const t = useTranslations("navbar");

  return (
    <section className=" w-full h-screen shadow-[0px_4px_6px_0px_#0000001A,_0px_2px_4px_0px_#0000000F] relative bg-black">
      <video
        className="w-full h-full object-cover pointer-events-none"
        width="100%"
        height="100%"
        controls={false}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        disablePictureInPicture
      >
        <source src={videoData} type="video/mp4" />
      </video>
      <ReduxContainer>
        <CustomLinkWithBG
          className="absolute z-20 bottom-[10%] left-1/2 -translate-x-1/2 hidden tablet:flex items-center justify-center "
          title={t("reservation")}
          href={reservationLink}
          external
        />
      </ReduxContainer>
    </section>
  );
}

export default Hero;
