"use client";
import { useTranslations } from "next-intl";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { Event } from "../../AppTypes";
import ImageModal from "./ImageModal";

type props = {
  events: Event;
};

function Events({ events }: props) {
  const t = useTranslations("homePage.eventsSection");
  const [shoWModal, setShowModal] = useState<boolean>(false);
  const [img, setImg] = useState<string>("");

  const openModal = useCallback((img: string) => {
    setShowModal(true);
    setImg(img);
  }, []);

  return (
    <section className="bg-[#f8f1edcc] h-[800px] w-full custom-container flex flex-col gap-8 items-center tablet:pt-10 mobile:h-[430px] lMobile:h-[400px] xl:h-[550px] xll:h-[600px] tablet:h-[500px] xs:h-[350px] lmb:h-[320px] axs:h-[400px] asm:h-[450px] asmm:h-[490px]">
      <ImageModal img={img} showModal={shoWModal} setShowModal={setShowModal} />
      <header className="w-[441px] lMobile:w-1/2 text-center  font-normal leading-[57.6px] ">
        <h2 className="font-Rufina text-mainColor text-5xl mobile:text-2xl xll:text-4xl xs:text-lg lmb:text-base axs:text-xl lMobile:text-2xl">
          {t("title")}
        </h2>
      </header>
      <div className="w-full flex items-center justify-center relative">
        <span className="w-[201px] h-[253px] bg-mainColor rounded-lg absolute top-0 left-64 z-0 tablet:h-[110px] mobile:left-5 mobile:top-5 tablet:left-40 tablet:top-5 xl:left-52 xll:left-44 xlll:left-52 cll:left-40 amd:left-32 xs:h-[100px] xs:w-[150px] ss:w-[150px] ss:left-24 lMobile:left-10 asmm:left-24 tablet:w-[100px] "></span>
        {events?.map((item, index) => {
          return (
            index === 1 && (
              <div
                className={`h-[458px] xlll:h-[370px] xl:w-[350px]  tablet:h-[280px] tablet:w-[250px] mobile:w-[170px] mobile:h-[216px] mobile:absolute mobile:top-0 mobile:left-[94px] xs:left-[70px] relative w-[471px] lMobile:-left-3 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.06),0px_4px_6px_0px_rgba(0,0,0,0.1)] amd:w-[290px] cll:h-[350px] cll:w-[340px] xlll:w-[400px] xl:h-[410px]  alg:h-[350px] clg:w-[300px] clg:h-[300px] asm:w-[200px] asm:h-[250px] sm:w-[180px] dmd:w-[230px] dmd:h-[300px] xs:w-[130px]  xs:h-[150px] lmb:w-[120px] lmb:left-[55px] axs:w-[160px] axs:left-[80px] axs:h-[200px] lMobile:h-[220px] lMobile:w-[170px] bxs:w-[150px] bxs:left-[75px]`}
                key={item.id}
              >
                <button
                  onClick={() => openModal(item.image)}
                  type="button"
                  aria-label="image button"
                >
                  <Image
                    src={item.image}
                    alt="image"
                    sizes="100%"
                    className="rounded-[8px] border-[0.5px] border-mainColor"
                    fill
                  />
                  <h3 className="absolute ltr:top-2 rtl:top-3 text-white font-Rufina text-[40px] mobile:text-[20px] left-5  font-medium bxs:text-sm ss:text-lg tablet:text-2xl ">
                    {item.name}
                  </h3>
                </button>

                {events
                  ?.filter((_, i) => i !== 1)
                  ?.map((item, i) => (
                    <button
                      onClick={() => openModal(item.image)}
                      type="button"
                      aria-label="image button"
                      key={item.id}
                      className={`absolute overflow-hidden border-[0.5px] border-mainColor rounded-[8px]  ${
                        i < 1
                          ? `w-[83%] h-[68%] -left-[66%] mobile:-left-[55%] -bottom-10 shadow-[0px_15.583px_23.374px_0px_rgba(0,0,0,0.06),0px_6.233px_9.35px_0px_rgba(0,0,0,0.1)] z-10 cll:-bottom-3 xll:-bottom-1 xlll:-bottom-3`
                          : `w-[91%] h-[80%] -right-[80%] top-10 shadow-[0px_18.586px_28.879px_0px_rgba(0,0,0,0.06),0px_7.434px_11.152px_0px_rgba(0,0,0,0.1)] z-10 `
                      }`}
                    >
                      <Image src={item.image} alt="image" sizes="100%" fill />
                      <h3 className="absolute ltr:bottom-0 rtl:bottom-3 text-white font-Rufina text-[40px] mobile:text-[20px] ltr:left-5 rtl:right-5 font-medium bxs:text-sm ltr:lmb:left-2 trl:lmb:right-2 lMobile:text-lg ss:text-xl tablet:text-2xl ltr:tablet:left-2 clg:text-3xl">
                        {item.name}
                      </h3>
                    </button>
                  ))}
              </div>
            )
          );
        })}
      </div>
    </section>
  );
}

export default Events;
