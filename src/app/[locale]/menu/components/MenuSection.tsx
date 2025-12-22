"use client";
import { useInView } from "react-intersection-observer";
import { useLocale, useTranslations } from "next-intl";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useHash } from "../../main-components/useHash";
import dynamic from "next/dynamic";
import { Meals, MenuData } from "../../AppTypes";
const CategorySection = dynamic(() => import("./CategorySection"), {
  ssr: false,
});
import tree from "/public/assets/tree.png";
import whiteTree from "/public/assets/white-tree.png";
import flowerBG from "/public/assets/menuFlowerBg.png";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchData } from "@/store/AssetsSlice";
import ramadanRightImg from '/public/assets/ramadanRightImg.svg'
import ramadanLeftImg from '/public/assets/ramadanLeftImg.svg'
import ramadanBG from '/public/assets/ramadanBG.svg'
import ramadanBottomImage from '/public/assets/ramadanFooter.svg'
import { resort } from "../../main-components/fonts";
import { updateMenuData } from "../../actions";

type props = {
  menuData: MenuData | undefined;
  isRamadan?: boolean
}

function MenuSection({ menuData, isRamadan }: props) {
  const t = useTranslations("menuPage");
  const { hash, updateHash, deleteHash } = useHash();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const categoriesRef = useRef<HTMLUListElement>(null);
  const ramadanRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<string>(locale);


  const { ref, inView } = useInView();

  const handleTopScroll = useCallback(() => {

    if (isRamadan) {
      ramadanRef?.current?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      categoriesRef?.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [isRamadan]);

  const handleMenuLang = useCallback(
    (lang: string) => {
      deleteHash();
      setLang(lang);
      router.replace(pathname, { scroll: false });
    },
    [pathname, router, deleteHash]
  );

  const Recursion = memo(function Sections(props: {
    id: string;
    data: Meals;
    title: string;
    lang: string;
    grouped: boolean;
    chooseText?: string;
  }) {
    return (
      <CategorySection
        grouped={props.grouped}
        currency={t("currency")}
        id={props.id}
        title={props.title}
        data={props.data}
        calories={t("calories")}
        lang={props.lang}
        isRamadan={isRamadan}
        choose={props.chooseText}
      />
    );
  });

  const apiData = useAppSelector((state) => state.assets.apiData);
  const status = useAppSelector((state) => state.assets.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);
  const bgImg = apiData?.data?.find(
    (item) => item?.type === "button-with-bg"
  )?.image;



  return (
    <section
      ref={ref}
      className="px-[80px] flex flex-col gap-[30px] xll:gap-7 tablet:gap-8 tablet:px-5 pb-10 lg:px-10 blg:px-7 relative lMobile:gap-5 clg:gap-5 ss:gap-3 min-h-screen pt-10 tablet:pt-5 overflow-hidden"
    >
      {isRamadan && (
        <>
          <Image src={ramadanRightImg} width={100} height={100} className="absolute -top-10 ss:-top-4 right-10 w-auto h-auto -z-10 ss:h-[150px] bxs:h-[100px] clg:h-[200px] xll:h-[250px] xlll:h-[300px]" alt="right ramadan bg" />
          <Image src={ramadanLeftImg} width={100} height={100} className="absolute top-0 left-10 w-auto h-auto !-z-30 ss:h-[150px] bxs:h-[90px] clg:h-[200px]  xll:h-[250px] xlll:h-[280px]" alt="left ramadan bg" />
        </>
      )}
      {isRamadan && (
        <div className="absolute w-full h-full left-0 top-0 flex flex-col -z-50">
          <Image
            src={ramadanBG}
            width={100}
            height={100}
            className=" w-full h-auto -z-10"
            alt="right ramadan bg"
          />
          <Image
            src={ramadanBG}
            width={100}
            height={100}
            className=" w-full h-auto -z-10"
            alt="right ramadan bg"
          />
          <Image
            src={ramadanBG}
            width={100}
            height={100}
            className=" w-full h-auto -z-30"
            alt="right ramadan bg"
          />
          <Image
            src={ramadanBG}
            width={100}
            height={100}
            className=" w-full h-auto -z-30"
            alt="right ramadan bg"
          />
          <Image
            src={ramadanBG}
            width={100}
            height={100}
            className=" w-full h-auto -z-30"
            alt="right ramadan bg"
          />
        </div>
      )}


      {!isRamadan && (
        <>
          <span className="absolute top-[520px] right-0 opacity-30 clg:hidden -z-10 w-[315px] h-[300px] ">
            <Image src={flowerBG} alt="logo flower" sizes="108px" fill />
          </span>
          <span className="absolute bottom-0 left-0 w-[252px] h-[342px] mobile:w-[181px] mobile:h-[246px] -z-10 ltablet:hidden">
            <Image
              className="opacity-20"
              src={tree}
              fill
              alt="bottom tree"
              sizes="(max-width: 600px) 186px, 315px"
            />
          </span>
          <span className="absolute bottom-[150px] left-0 w-[252px] h-[342px] mobile:w-[181px] mobile:h-[246px] -z-10 ltablet:hidden">
            <Image
              className="opacity-20"
              src={whiteTree}
              fill
              alt="top tree"
              sizes="(max-width: 600px) 186px, 315px"
            />
          </span>
        </>
      )}
      {inView && (
        <button
          className="bg-[#E5CBBD] w-[52px] h-[52px] fixed z-30 bottom-5 flex items-center justify-center right-10 rounded lMobile:right-2 bxs:right-1 lMobile:w-[30px] lMobile:h-[30px] lMobile:bottom-10 bxs:w-[30px] bxs:h-[30px] bxs:bottom-5 "
          onClick={handleTopScroll}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            className="lMobile:w-5 lMobile:h-5 bxs:w-4 bxs:h-4"
          >
            <path
              d="M12.9241 19.761L26 26L13.1172 0L0 25.9067L12.9241 19.761Z"
              fill="#381112"
            />
          </svg>
        </button>
      )}
      <div className="w-full flex flex-col gap-[27px] items-center tablet:gap-10 lMobile:gap-5">
        <ul className="flex items-center gap-3 font-Rufina text-mainColor text-base lMobile:text-sm">
          <li>
            <button
              className={`h-[38px] w-[60px] lMobile:h-[30px] lMobile:text-sm bxs:text-xs flex items-center justify-center ${lang === "en"
                  ? "bg-[url('/assets/langBtn.png')] "
                  : "bg-[url('/assets/whitelangBtn.png')]"
                } bg-[length:100%_100%]`}
              type="button"
              onClick={() => {
                handleMenuLang("en");
                updateMenuData(locale)

              }}
            >
              English
            </button>
          </li>
          <li>
            <button
              className={`h-[38px] w-[60px] lMobile:h-[30px] bxs:text-xs lMobile:text-sm flex items-center justify-center ${lang === "ar"
                  ? "bg-[url('/assets/langBtn.png')] "
                  : "bg-[url('/assets/whitelangBtn.png')]"
                } bg-[length:100%_100%]`}
              type="button"
              onClick={() => {
                handleMenuLang("ar");
                updateMenuData(locale)
              }}
            >
              العربية
            </button>
          </li>
        </ul>

        {!isRamadan ? (
          <ul
            ref={categoriesRef}
            className="w-full grid grid-cols-4 gap-x-6 gap-y-10 clg:gap-y-5 lMobile:gap-y-3 tablet:gap-y-5 tablet:grid-cols-2 scroll-mt-32 "
          >
            {menuData?.categories?.map((item, index) => {
              const isActive =
                hash ===
                `${lang === "en"
                  ? `#${item.name_en.replace(/\s+/g, "-")}`
                  : `#${item.name_ar.replace(/\s+/g, "-")}`
                }` ||
                (!hash && index === 0);
              return (
                <li
                  className={`col-span-1 bxs:text-[10px] h-[54px] text-xl sm:text-xs clg:text-base  mobile:h-9 tablet:h-11 text-mainColor font-Rufina bg-[length:100%_100%] xll:text-lg  cursor-pointer relative ${!isActive && "bg-[url('/assets/button-with-whiteBG.png')]"
                    }`}
                  key={item.id}
                >
                  {isActive && bgImg && (
                    <Image src={bgImg} alt="menu image" fill className="-z-10" />
                  )}
                  <Link
                    onClick={() => {
                      updateHash(
                        lang === "en"
                          ? `#${item.name_en.replace(/\s+/g, "-")}`
                          : `#${item.name_ar.replace(/\s+/g, "-")}`
                      );
                    }}
                    className="w-full h-full flex items-center justify-center clg:p-3 text-center"
                    href={
                      lang === "en"
                        ? `#${item.name_en.replace(/\s+/g, "-")}`
                        : `#${item.name_ar.replace(/\s+/g, "-")}`
                    }
                  >
                    {lang === "en" ? item.name_en : item.name_ar}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) :
          <div
            ref={ramadanRef}


            className="flex flex-col items-center text-[#4F4F4F] gap-1">
            <h2 className={`text-mainColor  ${lang === "ar" ? " text-[96px] clg:text-[64px] xlll:text-[72px] leading-tight  ss:text-[32px]" : resort.className + " text-5xl ss:text-base clg:text-3xl xlll:text-4xl"}`}>
              {lang === "en" ? <>
                <div className="flex flex-col gap-3 items-center clg:gap-1 ss:gap-0">
                  <span>Ramadan</span>
                  <span className="tracking-widest">Set Menu</span>
                </div>

              </> :
                <div className="flex flex-col  items-center">
                  <span>قائمة</span>
                  <span className="-mt-10 clg:-mt-2">افطار رمضان</span>
                </div>
              }
            </h2>
            <div className={`text-2xl ss:text-xs bxs:text-[10px] flex flex-col items-center gap-1 ss:text-[10px] ${lang === "ar" ? "flex-row-reverse" : ""}`}>
              <span

                className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
                  <g clipPath="url(#clip0_1572_116)">
                    <path d="M8.13931 12.6996C7.91043 13.2071 7.75913 13.7578 7.70117 14.3354L12.5448 13.3058C12.7737 12.7984 12.9249 12.2475 12.9829 11.6699L8.13931 12.6996Z" fill="#381112" />
                    <path d="M12.545 10.221C12.7738 9.71362 12.9251 9.16275 12.9831 8.58518L9.21006 9.38764V7.84501L12.5448 7.13634C12.7737 6.62894 12.925 6.07807 12.983 5.5005L9.20995 6.30228V0.754539C8.63181 1.07915 8.11836 1.51125 7.70099 2.02093V6.62312L6.19202 6.94386V0C5.61388 0.324499 5.10043 0.756707 4.68306 1.26639V7.26448L1.30675 7.98193C1.07786 8.48933 0.926452 9.04021 0.868376 9.61778L4.68306 8.8071V10.7498L0.59488 11.6185C0.365996 12.1259 0.214701 12.6768 0.156738 13.2544L4.43592 12.345C4.78427 12.2725 5.08366 12.0666 5.27832 11.7832L6.06309 10.6197V10.6195C6.14456 10.4991 6.19202 10.3539 6.19202 10.1976V8.48637L7.70099 8.16563V11.2509L12.5448 10.2208L12.545 10.221Z" fill="#381112" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1572_116">
                      <rect width="12.8264" height="14.3353" fill="white" transform="translate(0.156982)" />
                    </clipPath>
                  </defs>
                </svg>
                295

              </span>
              <span className="text-sm ss:text-xs mt-auto">( {lang === "en" ? "VAT inclusive" : "شامل الضريبة"} )</span>
            </div>
          </div>}
      </div>
      {/* {isPending ? (
        <div className="h-[200px] w-full flex items-center justify-center relative">
          <div className="w-[203px] mobile:w-[150px] mobile:border-[10px] aspect-square rounded-full border-[30px]  z-50 border-white/30 border-r-mainColor animate-spin"></div>
        </div>
      ) : (
        
      )} */}
      {menuData?.categories?.map((item, index) => {
        const relatedMeals = menuData?.meals.filter(
          (meal) => meal.category_id === item.id
        );

        if (index < menuData?.categories.length)
          return (
            <Recursion
              grouped={item?.grouped}
              lang={lang}
              key={item.id}
              id={
                lang === "en"
                  ? item.name_en.replace(/\s+/g, "-")
                  : item.name_ar.replace(/\s+/g, "-")
              }
              data={relatedMeals}
              title={lang === "en" ? item.name_en : item.name_ar}
              chooseText={isRamadan && (item?.title_ar !== "" || item?.title_en !== "") ? lang === "en" ? item?.title_en : item?.title_ar : ""}

            />
          );
      })}
      {isRamadan && (
        <Image src={ramadanBottomImage} alt="menu image" priority={true} className=" ss:h-[100px] ltablet:h-[150px] mx-auto" />

      )}

    </section>
  );
}

export default MenuSection;
