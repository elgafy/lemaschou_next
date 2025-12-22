import React from "react";
import img from "/public/assets/venue-large-img.png";
import { useTranslations } from "next-intl";
import flower from "/public/assets/logoFlower.png";
import flowerBG from "/public/assets/flowervenubg.png";
import Image from "next/image";

type Props = {
  about: string;
};

function IntroSection({ about }: Props) {
  const t = useTranslations("venuePage");
  return (
    <section className="px-[90px] flex-col flex items-center gap-16 tablet:gap-8 relative tablet:px-6">
      <div className="absolute w-[315px] h-[300px] cll:h-[240px] tablet:w-[120px] tablet:h-[150px] tablet:-top-[55px] -top-[103px] right-0 xlll:w-[250px] xll:w-[220px] xll:h-[250px] xl:w-[200px] alg:w-[180px] alg:h-[220px] cmd:w-[150px] cmd:h-[200px] xs:w-[70px] xs:h-[100px] mobile:w-[90px] mobile:h-[120px] lMobile:h-[140px] lMobile:w-[100px]">
        <Image
          className="opacity-30"
          src={flowerBG}
          alt="flower"
          sizes="315px"
          fill
        />
      </div>
      <header className="relative flex items-center gap-4 flex-col mobile:items-start mobile:gap-2 ">
        <h1 className="font-Rufina font-normal text-5xl text-mainColor w-fit mobile:text-[20px] tablet:text-2xl tablet:mx-auto cll:text-4xl alg:text-4xl clg:text-3xl">
          {t("title")}
        </h1>
        <p className="text-[#4F4F4F] mobile:text-xs tablet:text-base alg:text-center tablet:font-normal alg:w-3/4 mobile:w-full ss:text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Varius sed
          pharetra dictum neque massa congue
        </p>
        <span className="absolute -top-[58px] -z-10 left-[41%] w-[108px] h-[177px] rotate-[5deg] mobile:w-[50px] mobile:h-[64px] mobile:-top-5 mobile:left-[42.5%] cll:w-[100px] cll:left-[42.5%] cll:-top-9 cll:h-[100px] xlll:h-[140px] xlll:w-[100px] xlll:left-[42%] xlll:-top-12 alg:h-[110px] alg:w-[80px] alg:left-[43.5%] alg:-top-10 clg:h-[95px] clg:w-[75px] clg:left-[44%] clg:-top-8 lmd:left-[43%] tablet:h-[85px] tablet:w-[70px] tablet:-top-8 tablet:left-[44%] ss:left-[42.5%] ss:-top-6 ss:w-[60px] ss:h-[70px] lMobile:left-[41.5%] lMobile:-top-6  xs:left-[40%]">
          <Image src={flower} alt="logo flower" sizes="108px" fill />
        </span>
      </header>
      <div className="flex items-center gap-6 w-full xll:flex-col">
        <div className="w-[551px] h-[381px] rounded-[8px] relative overflow-hidden mobile:w-[352px] mobile:h-[213px] lMobile:w-[380px] tablet:h-[233px] cll:h-[300px] xxl:w-[600px] alg:w-[530px] ss:w-[450px] xs:w-[300px] xs:h-[180px] lmb:w-[260px] bxs:w-[340px]">
          <Image
            src={img}
            alt="large image"
            sizes="(max-width: 600px) 100px, 600px"
            fill
          />
        </div>
        <div className="flex flex-col gap-6 flex-1 text-mainColor mobile:gap-3">
          <header>
            <h2 className="text-2xl font-Rufina font-bold mobile:text-base mobile:font-normal  cmd:text-lg lmb:text-sm">
              {t("introTitle")}
            </h2>
          </header>
          <p className="text-2xl font-normal mobile:text-xs cmd:text-base xlll:text-lg tablet:text-sm xs:text-[10px]">
            {about}
          </p>
        </div>
      </div>
    </section>
  );
}

export default IntroSection;
