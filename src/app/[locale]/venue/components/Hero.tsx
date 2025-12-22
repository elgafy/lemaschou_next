import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

type props = {
  text: string;
  image: string;
};

function Hero({ text, image }: props) {
  const t = useTranslations("venuePage");
  return (
    <section className="px-10 h-screen flex items-center justify-start tablet:px-6 lmd:px-14 clg:px-20 clg:items-end ss:pb-[100px] lMobile:pb-3 clg:pb-10 bxs:pb-[10px] relative overflow-hidden ">
      <div className="absolute top-0 left-0 w-[101%]   -z-10 h-[110%]">
        <Image
          src={image}
          fill
          alt="venue hero bg"
          sizes="100vw"
          className="w-full h-full  object-cover"
        />
      </div>
      <header className="flex flex-col gap-5 text-heroTextColor w-[500px] cmd:gap-2">
        <h1 className="font-lato text-5xl cmd:text-2xl bxs:text-xl">
          {t("about")}
        </h1>
        <p className="font-Rufina cmd:text-sm xs:text-xs">{text}</p>
      </header>
    </section>
  );
}

export default Hero;
