import React from "react";
import { FAQSType } from "../AppTypes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import whiteTree from "/public/assets/white-tree.png";
import flowerBG from "/public/assets/menuFlowerBg.png";
import Image from "next/image";

type props = {
  faqs: FAQSType;
};

function FAQS({ faqs }: props) {
  const t = useTranslations("homePage.menuSection");

  return (
    <div className="w-full flex items-center justify-center my-[104px] gap-12 clg:my-5  relative">
      <span className="absolute top-0 right-0 opacity-30  -z-10 w-[315px] h-[300px] clg:w-[150px] clg:h-[150px] ss:w-[118px] ss:h-[118px] xl:w-[200px] xl:h-[200px]">
        <Image src={flowerBG} alt="logo flower" sizes="108px" fill />
      </span>
      <span className="absolute bottom-0 left-0 w-[252px] h-[342px] mobile:w-[181px] mobile:h-[246px] -z-10 ">
        <Image
          className="opacity-20"
          src={whiteTree}
          fill
          alt="top tree"
          sizes="(max-width: 600px) 186px, 315px"
        />
      </span>
      <div className="w-[80%]  flex flex-col items-center justify-center gap-16 clg:w-full clg:gap-5">
        <header className="flex flex-col gap-3 text-mainColor  items-center ss:gap-1">
          <h2 className="text-5xl font-semibold font-Rufina ss:text-xl ltablet:text-3xl  ">
            {t("faq")}
          </h2>
          <span className="text-3xl font-Rufina ss:text-lg ltablet:text-2xl">
            {t("faqTitle")}
          </span>
        </header>

        <Accordion
          type="single"
          collapsible
          className="flex justify-between gap-y-5 w-[80%] items-start flex-wrap ss:w-[90%]"
        >
          {faqs?.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq?.question}
              className="w-full bg-[#E5CBBD] p-3 rounded-md flex flex-col text-mainColor h-auto clg:w-full ss:py-0 relative "
              itemID={faq.answer}
            >
              <div className="absolute top-0 left-0 w-full h-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 1260 91"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1259.71 10.5078V10.365H1259.56H1253.02V8.20467H1257.27H1257.41V8.06184V2.96023V2.81741H1257.27H1252.1H1251.95V2.96023V7.10037H1249.72V0.693977V0.551161L1249.58 0.551156L10.31 0.510499L10.1671 0.510495V0.65332V7.05971H7.94689V2.91958V2.77676H7.80407H2.6326H2.48978V2.91958V8.02119V8.16401H2.6326H6.84259V10.3243H0.316406H0.173585V10.4671V80.5942V80.737H0.316406H6.84259V82.9073H2.6326H2.48978V83.0502V88.1418V88.2846H2.6326H7.80407H7.94689V88.1418V84.0116H10.1671V90.408V90.5508L10.3099 90.5509L1249.58 90.5915H1249.72V90.4487V84.0523H1251.91V88.1824V88.3253H1252.06H1257.23H1257.37V88.1824V83.0908V82.948H1257.23H1253.02V80.7777H1259.56H1259.71V80.6349V10.5078ZM1251.91 11.3764V11.5192H1252.06H1258.57V79.7133H1252.06H1251.91V79.8562V82.9879H1248.72H1248.58V83.1308V89.5271L11.2714 89.4865V83.0901V82.9473H11.1286H7.94689V79.8155V79.6727H7.80407H1.27789L1.27789 11.4786H7.80407H7.94689V11.3357V8.20395H11.1286H11.2714V8.06113V1.65472L1248.58 1.69536V8.10179V8.24461H1248.72H1251.91V11.3764ZM1253.02 7.14031V3.97165H1256.26V7.14031H1253.02ZM1253.02 87.3008V84.1322H1256.26V87.3008H1253.02ZM3.59408 7.09965V3.93099H6.84259V7.09965H3.59408ZM3.59408 87.2602V84.0915H6.84259V87.2602H3.59408Z"
                    fill="#643D3F"
                    stroke="#643D3F"
                    strokeWidth="0.285642"
                  />
                </svg>
              </div>
              <AccordionTrigger className=" text-xl font-Rufina font-medium ss:text-sm relative">
                {faq?.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#5C6574] font-normal overflow-hidden text-base ss:text-xs">
                {faq?.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FAQS;
