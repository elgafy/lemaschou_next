"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import arrow from "/public/icons/lang-changer-arrow.svg";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

type Props = {
  className?: string;
};
function LanguageChanger({ className }: Props) {
  const activeLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    const newPathname = pathname.replace(`/${activeLocale}`, `/${value}`);
    router.replace(newPathname);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger
        aria-label="Change language"
        className={cn(
          "text-white bg-transparent uppercase cmd:gap-1 gap-2 border-none w-fit  focus:ring-0 focus:border-none ",
          className
        )}
      >
        <SelectValue
          placeholder={activeLocale === "en" ? "English" : "العربية"}
        />
        <Image
          src={arrow}
          alt="arrow"
          width={11}
          height={7}
          className="w-[11px] h-[7px] mobile:hidden"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#381112"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-down hidden mobile:block"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </SelectTrigger>
      <SelectContent className="text-[14px] font-semibold bg-[#E5CBBD]">
        <SelectItem
          aria-label="English"
          className={`cursor-pointer  ${
            activeLocale === "en" ? "bg-[#381112] text-white" : ""
          } `}
          value="en"
        >
          English
        </SelectItem>
        <SelectItem
          aria-label="Arabic"
          className={`cursor-pointer ${
            activeLocale === "ar" ? "bg-[#381112] text-white" : ""
          }`}
          value="ar"
        >
          العربية
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default LanguageChanger;
