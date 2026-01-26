import React, { memo } from "react";
import { resort } from "../../main-components/fonts";
import { MealModalCard } from "./MealModalCard";
import Image from "next/image";
import { Meals } from "../../AppTypes";
import star from "/public/assets/star.svg";

type props = {
  currency: string;
  calories?: string;
  id: string;
  title: string;
  data: Meals;
  lang?: string;
  grouped: boolean | number;
  isRamadan?: boolean
  choose?: string
};

function CategorySection({
  id,
  title,
  data,
  calories,
  currency,
  lang,
  grouped,
  isRamadan,
  choose
}: props) {

// users data array

console.log(grouped);

  const Brackets=memo(function brackets(props:{
    text:string
  }) {
    return (
      <span className="!font-Rufina text-xl ss:text-xs">
      {props?.text !=="" && `(${props.text})`}
      </span>
    )
  })
  return (
    <div
      id={id}
      className="w-full flex flex-col gap-[44px] items-center tablet:gap-5 scroll-mt-28 cll:gap-8"
    >
       <header>
        <h2
        dir={lang === "en" ? "ltr" : "rtl"}
          className={`${lang === "ar" ? " bxs:text-xl ss:!text-2xl clg:text-4xl xll:text-4xl xlll:text-5xl" : resort.className} text-[64px] font-normal text-mainColor cll:text-2xl ss:text-xl sm:text-xl lg:text-3xl lMobile:text-lg bxs:text-base xll:text-2xl xlll:text-3xl `}
        >
          {title} {isRamadan  && <Brackets text={choose ||""}  /> } 
        </h2>
      </header>

      {grouped || grouped == 1 ? (
        <div
          className={`w-full grid grid-cols-2 gap-6 tablet:grid-cols-1 bg-[length:100%_100%] px-20 ss:px-10 py-14 ss:py-14 bxs:py-12  relative tablet:pb-20 ${
            data?.length <= 5 ? "bxs:py-5 " : "bxs:pb-20 "
          } ss:pb-20`}
        >
          <div className={"SVGContainer"}>
            <svg
              viewBox="0 0 572 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <g filter="url(#filter0_dd_611_801)">
                <path
                  d="M543.829 164.499H27.4931V153.035H24.0504V158.19H16.4136V150.693H21.6563V147.303H10L10.6782 21.1786H22.3344V17.7883H17.1092V10.3087H24.7286V15.4466H28.1713V4H544.507V15.4466H547.967V10.3087H555.586V17.7883H550.344V21.1786H562L561.322 147.303H549.666V150.693H554.908V158.19H547.289V153.035H543.829V164.499Z"
                  fill="white"
                />
              </g>
              <path
                d="M561.986 21.1785V21.0035H561.811H550.295V16.1108H552.969H553.143V15.9358V12.6505V12.4755H552.969H549.666H549.491V12.6505V15.2715H544.493V4V3.825H544.318H27.5281H27.3531V4V15.2715H22.3556V12.6505V12.4755H22.1806H18.8427H18.6677V12.6505V15.9358V16.1108H18.8427H21.5337V21.0035H10H9.825V21.1785V147.862V148.037H10H21.5337V152.93H18.8078H18.6328V153.105V156.39V156.565H18.8078H22.1456H22.3206V156.39V153.752H27.3181V165.041V165.216H27.4931H544.283H544.458V165.041V153.752H549.456V156.39V156.565H549.631H552.969H553.144V156.39V153.105V152.93H552.969H550.33V148.037H561.811H561.986V147.862L561.986 21.1785ZM549.491 147.303V152.86H543.846H543.671V153.035V164.324H28.1575V153.035V152.86H27.9825H22.3206V147.303V147.128H22.1456H10.6644V21.7555H22.1456H22.3206V21.5805V16.041H27.9825H28.1575V15.866V4.57696H543.671V15.866V16.041H543.846H549.491V21.5805V21.7555H549.666H561.164V147.197L549.667 147.128L549.491 147.127V147.303ZM550.4 15.2715V13.2973H552.427V15.2715H550.4ZM550.4 155.796V153.822H552.427V155.796H550.4ZM19.507 15.2715V13.2973H21.5337V15.2715H19.507ZM19.507 155.796V153.822H21.5337V155.796H19.507Z"
                fill="#643D3F"
                stroke="#643D3F"
                strokeWidth="0.35"
              />
              <path
                d="M560.209 23.0385V22.7885H559.959H548.5V19.007H555.939H556.189V18.757V9.82688V9.57688H555.939H546.887H546.637V9.82688V17.0739H542.733V5.85992V5.60992H542.483H29.3979H29.1479V5.85992V17.0739H25.2615V9.82688V9.57688H25.0115H15.9591H15.7091V9.82688V18.757V19.007H15.9591H23.3285V22.7885H11.9048H11.6548V23.0385V145.792V146.042H11.9048H23.3285V149.841H15.9591H15.7091V150.091V159.004V159.254H15.9591H25.0115H25.2615V159.004V151.774H29.1479V162.971V163.221H29.3979H542.483H542.733V162.971V151.774H546.567V159.004V159.254H546.817H555.869H556.119V159.004V150.091V149.841H555.869H548.5V146.042H559.959H560.209V145.792V23.0385ZM546.567 24.5589V24.8089H546.817H558.223V144.179H546.817H546.567V144.429V149.911H540.98H540.73V150.161V161.357H31.0808V150.161V149.911H30.8308H25.2615V144.429V144.179H25.0115H13.5878L13.5878 24.8089H25.0115H25.2615V24.5589V19.0769H30.8308H31.0808V18.8269V7.6128H540.73V18.8269V19.0769H540.98H546.567V24.5589ZM548.5 17.1439V11.5973H554.169V17.1439H548.5ZM548.5 157.46V151.914H554.169V157.46H548.5ZM17.6422 17.1439V11.5973H23.3285V17.1439H17.6422ZM17.6422 157.46V151.914H23.3285V157.46H17.6422Z"
                fill="#643D3F"
                stroke="#643D3F"
                strokeWidth="0.5"
              />
              <defs>
                <filter
                  id="filter0_dd_611_801"
                  x="0.828623"
                  y="0.942874"
                  width="570.343"
                  height="178.842"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="6.11425" />
                  <feGaussianBlur stdDeviation="4.58569" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_611_801"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="3.05713" />
                  <feGaussianBlur stdDeviation="3.05713" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_611_801"
                    result="effect2_dropShadow_611_801"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_611_801"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>

          {data?.map((item) => (
            <div
              key={item.id}
              className="col-span-1 flex items-center justify-between text-mainColor"
            >
              <span className="font-semibold text-base ss:text-xs">
                {lang === "en" ? item.name_en : item.name_ar}
              </span>
              <span className="text-sm ss:text-[10px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
  <g clipPath="url(#clip0_1561_159)">
    <path d="M8.13931 12.7406C7.91043 13.2481 7.75913 13.7988 7.70117 14.3764L12.5448 13.3468C12.7737 12.8394 12.9249 12.2885 12.9829 11.7109L8.13931 12.7406Z" fill="#381112"/>
    <path d="M12.545 10.262C12.7738 9.75463 12.9251 9.20376 12.9831 8.62619L9.21006 9.42865V7.88603L12.5448 7.17736C12.7737 6.66996 12.925 6.11909 12.983 5.54152L9.20995 6.34329V0.795555C8.63181 1.12017 8.11836 1.55226 7.70099 2.06194V6.66414L6.19202 6.98487V0.0410156C5.61388 0.365514 5.10043 0.797722 4.68306 1.3074V7.30549L1.30675 8.02295C1.07786 8.53035 0.926452 9.08122 0.868376 9.65879L4.68306 8.84812V10.7908L0.59488 11.6595C0.365996 12.1669 0.214701 12.7178 0.156738 13.2954L4.43592 12.386C4.78427 12.3135 5.08366 12.1076 5.27832 11.8242L6.06309 10.6607V10.6605C6.14456 10.5401 6.19202 10.395 6.19202 10.2386V8.52738L7.70099 8.20665V11.2919L12.5448 10.2618L12.545 10.262Z" fill="#381112"/>
  </g>
  <defs>
    <clipPath id="clip0_1561_159">
      <rect width="12.8264" height="14.3353" fill="white" transform="translate(0.156982 0.0410156)"/>
    </clipPath>
  </defs>
</svg>
                {item.price}     
                
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div dir={lang === "en" ? "ltr" : "rtl"} className="w-full grid grid-cols-2 gap-6 ss:gap-2 bxs:gap-3 tablet:grid-cols-1 ">
          {data.map((item) => (
            <MealModalCard
            isRamadan={isRamadan}
              currency={currency}
              buttonClassName=" h-[161px] bxs:h-[100px] clg:h-[140px] ss:h-[125px] tablet:h-[142px] lMobile:h-[120px] whitespace-normal text-start !bg-[url('/assets/menuCardBG.png')] bg-[length:100%_100%] col-span-1 bg-transparent !border-none flex gap-[18px] lmd:gap-2 items-center justify-start px-9 bxs:px-5 mobile:px-6 blg:px-7 blg:h-[130px] relative overflow-hidden"
              title={lang === "en" ? item.name_en : item.name_ar}
              calories={calories}
              key={item.id}
              menu={true}
              meal={item}
              lang={lang}
            >
              {item?.image !== "" && (
                <div className="relative w-[115px] h-[100px] lg:w-[100px] lg:h-[90px] mobile:w-[70px] mobile:h-[80px] shrink-0 ss:w-[80px] ss:h-[71px] tablet:w-[90px] tablet:h-[81px] bxs:w-[60px] bxs:h-[70px] blg:w-[80px] blg:h-[70px] lmb:w-[50px] lmb:h-[60px]">
                  {item?.featured_type === "new" ? (
                    <span className="bg-[#E5CBBD]  absolute font-baskerville italic font-thin -top-3 leading-3 left-1/2 -translate-x-1/2 p-1 ss:text-[10px] text-sm bxs:text-[8px]  rounded text-mainColor bxs:-top-2 ">
                      {lang === "en" ? "New" : lang === "ar" ? "جديد" : null}
                    </span>
                  ) : item?.featured_type === "best seller" ? (
                    <span className=" w-[30px] h-[30px] absolute -top-5 ltr:left-1 rtl:right-0  p-1 text-sm rounded text-mainColor z-10 ss:w-[20px]  ss:-top-3 ss:h-[20px] bxs:w-[15px]  bxs:h-[15px] bxs:-top-2">
                      <Image
                        src={star}
                        alt="star"
                        fill
                        sizes="(max-width: 600px) 20px, 30px"
                      />
                    </span>
                  ) : null}
                  <Image
                    src={item.image}
                    alt={lang === "en" ? item.name_en : item.name_ar}
                    fill
                    sizes="115px"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 justify-between flex-wrap gap-1 ">
                <header className="w-full flex items-center justify-between gap-1">
                  <h3 className="w-fit font-Rufina text-2xl font-bold lMobile:text-sm cll:text-lg xll:text-xl blg:text-base  mobile:font-medium ss:text-base lmb:text-xs text-mainColor">
                    {lang === "en" ? item.name_en : item.name_ar}
                  </h3>
                  {!isRamadan&&(
                   <>
                    <div
                    dir="ltr"
                    className={`text-base font-bold mobile:text-xs cll:text-sm bxs:text-[10px] lMobile:font-semibold flex gap-2 items-center`}
                  >
                       <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
  <g clipPath="url(#clip0_1561_159)">
    <path d="M8.13931 12.7406C7.91043 13.2481 7.75913 13.7988 7.70117 14.3764L12.5448 13.3468C12.7737 12.8394 12.9249 12.2885 12.9829 11.7109L8.13931 12.7406Z" fill="#381112"/>
    <path d="M12.545 10.262C12.7738 9.75463 12.9251 9.20376 12.9831 8.62619L9.21006 9.42865V7.88603L12.5448 7.17736C12.7737 6.66996 12.925 6.11909 12.983 5.54152L9.20995 6.34329V0.795555C8.63181 1.12017 8.11836 1.55226 7.70099 2.06194V6.66414L6.19202 6.98487V0.0410156C5.61388 0.365514 5.10043 0.797722 4.68306 1.3074V7.30549L1.30675 8.02295C1.07786 8.53035 0.926452 9.08122 0.868376 9.65879L4.68306 8.84812V10.7908L0.59488 11.6595C0.365996 12.1669 0.214701 12.7178 0.156738 13.2954L4.43592 12.386C4.78427 12.3135 5.08366 12.1076 5.27832 11.8242L6.06309 10.6607V10.6605C6.14456 10.5401 6.19202 10.395 6.19202 10.2386V8.52738L7.70099 8.20665V11.2919L12.5448 10.2618L12.545 10.262Z" fill="#381112"/>
  </g>
  <defs>
    <clipPath id="clip0_1561_159">
      <rect width="12.8264" height="14.3353" fill="white" transform="translate(0.156982 0.0410156)"/>
    </clipPath>
  </defs>
</svg> 
                    </span>
                    <span>{item.price}</span>
                 
                  </div>
                  
                   </>
                  )}
                </header>

                
               {!isRamadan && item.grams && item.grams >= 1 && (
                 <p className="flex flex-wrap w-full text-[#5C6574] font-medium text-sm tracking-wide leading-relaxed mobile:w-full lmd:w-full ss:text-xs lmb:text-[10px] opacity-80">
                 <span className="inline-flex items-center gap-1">
                   {lang === "en"? item.grams + 'g' : item.grams + ' غرام'}
                 </span>
               </p>
               )}
               <p className="flex flex-wrap w-full text-[#5C6574] font-base font-normal mobile:w-full lmd:w-full ss:text-xs lmb:text-[10px]">
                 {lang === "en" ? item.desc_en : item.desc_ar}
               </p>
              </div>
            </MealModalCard>

          ))}
        </div>
      )}
    </div>
  );
}

export default CategorySection;
