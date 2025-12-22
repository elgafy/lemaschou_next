"use client"
import { useTranslations } from "next-intl";
import React from "react";
import logoWord from "/public/assets/logo-word.svg";
import Image from "next/image";
import { Meals } from "../../AppTypes";
import ramadanKareem from '/public/assets/ramadanKareem.svg'


type props = {
  meals: Meals;
  locale: string;
  image: string;
  isRamadan?: boolean
};

function Hero({image,isRamadan}: props) {
  const t = useTranslations("menuPage");




    
  return (
    <section className="h-screen shadow-[0px_2px_4px_0px_rgba(0,0,0,0.06),_0px_4px_6px_0px_rgba(0,0,0,0.10)] relative flex items-center justify-center  tablet:items-center cmd:justify-end tablet:pb-14 clg:pb-10 ss:pb-5 tablet:px-10 gap-14 text-heroTextColor flex-col  overflow-visible ss:h-[400px]">
     
      <div className="absolute w-full h-full -z-50 top-0 left-0 overflow-hidden ">
        <Image
          fill
          priority
          src={image}
          alt="menu background"
          sizes="100vw"
          className=" w-full scale-x-105 !h-[102%] !object-fill"
        />
      </div>
     {!isRamadan&&(
      <>
       <Image
       priority
       src={logoWord}
       alt="logo word image"
       sizes="(max-width: 600px) 186px, 447px"
       layout="intrinsic"
     />
     <header className="flex flex-col items-center gap-4 bxs:gap-5 w-[347px] tablet:w-full cmd:gap-1">
       <h1 className="font-Rufina text-5xl ss:text-3xl bxs:text-3xl ">
         {t("heroTitle")}
       </h1>
     </header>
      </>
     )}

     {
      isRamadan?
      <Image className="absolute bottom-5  ss:w-[90%]" src={ramadanKareem} alt="ramadan kareem"/>
      :
      (
        <></>
      //   <ul className="absolute bottom-0 left-0 grid grid-cols-4 gap-[75.79px] clg:gap-1 px-[87.64px] pt-[15.7px] pb-[27.3px] lg:px-10 lg bg-[#ffffff1a] w-full rounded-t-[71px] backdrop-blur-[5.949999809265137px] cmd:hidden lg:gap-10">
      //   {meals?.map((item) => (
      //     <li key={item.id} className="flex gap-[22px] items-center lmd:gap-3">
      //       {item?.image !== "" && (
      //         <span className="relative  w-[90px] blg:w-[70px] aspect-square">
      //           <Image
      //             alt={locale === "ar" ? item.name_ar : item.name_en}
      //             src={item.image}
      //             sizes="100px"
      //             fill
      //             className="object-cover rounded-lg"
      //           />
      //         </span>
      //       )}
      //       <div className="flex flex-col gap-2">
      //         <header>
      //           <h2 className="font-Rufina font-normal text-lg clg:text-base lmd:text-sm">
      //             {locale === "ar" ? item.name_ar : item.name_en}
      //           </h2>
      //         </header>
      //         <MealModalCard
      //           locale={locale}
      //           currency={t("currency")}
      //           calories={t("calories")}
      //           meal={item}
      //           buttonClassName="text-sm font-normal !bg-[#ffffff1f] w-fit py-[7px] px-[9px] rounded-[6px] backdrop-blur-[9.208040237426758px] border-none !text-white ltablet:text-xs ltablet:font-normal ltablet:py-2 ltablet:px-1 lmd:h-fit lmd:text-xs"
      //           title={t("heroCTA")}
      //         />
      //       </div>
      //     </li>
      //   ))}
      // </ul>
      )
     }
    </section>
  );
}

export default Hero;
