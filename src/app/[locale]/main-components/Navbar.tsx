"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useRef } from "react";
import logoEN from "/public/icons/en-logo.webp";
import logoAR from "/public/icons/ar-logo.webp";
import Image from "next/image";
import LanguageChanger from "./LanguageChanger";
import CustomLinkWithBG from "./CustomLinkWithBG";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

type props = {
  reservationLink: string;
};

function Navbar({ reservationLink }: props) {
  const t = useTranslations("navbar");
  const locale = useLocale();

  const pathname = usePathname();
  

  // to change the color of burger menu in mobile into main color

  const Paths = [
    `/${locale}`,
    `/${locale}/menu`,
    `/${locale}/venue`,
    `/${locale}/faqs`,
  ];
  const validPath = Paths.includes(pathname);

  const links = [
    {
      id: 1,
      link: t("home"),
      href: "/" + locale,
      active: "/",
    },
    {
      id: 2,
      link: t("menu"),
      href: "/" + locale + "/menu",
      active: `/menu`,
    },
    {
      id: 3,
      link: t("venue"),
      href: "/" + locale + "/venue",
      active: `/venue`,
    },
    {
      id: 4,
      link: t("faqs"),
      href: "/" + locale + "/faqs",
      active: `/faqs`,
    },
  ];
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <header className="fixed top-0 w-full z-40">
      <nav
        ref={navRef}
        className="w-full grid grid-cols-3 py-4 px-[88px] items-center justify-between transition-all duration-300 tablet:p-4 bg-mainColor/80 xs:py-2 clg:px-10"
      >
        <ul className="flex items-center gap-8  text-white font-[Rufina] text-sm font-bold tablet:hidden">
          {links.map((link, index) => {
            const isActive =
              pathname.replace(`/${locale}`, ``) ===
                "/" + link.link.toLowerCase() ||
              (index === 0 && pathname === "/" + locale) ||
              pathname.replace(`/${locale}`, ``) === link.active;

            return (
              <li
                className={isActive ? "underline underline-offset-[16px]" : ""}
                key={link.id}
              >
                <Link aria-label={link.link} href={link.href}>
                  {link.link}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="col-span-1 flex items-center justify-center">
          <Link
            aria-label="go to home page"
            className="w-[126px] h-[85px] relative sm:w-[126px] sm:h-[65px] bxs:w-[96px] bxs:h-[45px] flex items-center justify-center "
            href={"/" + locale}
          >
            <Image
              priority
              src={locale === "ar" ? logoAR : logoEN}
              alt="go to home page"
              fill
              sizes="(max-width: 768px) 66px, 126px"
              className="object-contain"
            />{" "}
          </Link>
        </div>
        <div className="hidden tablet:flex col-span-2 justify-end">
          <MobileMenu validPath={validPath} locale={locale} />
        </div>

        <div className="flex items-center gap-5 tablet:hidden justify-end">
          <LanguageChanger className="clg:text-xs amd:text-[10px]" />
          <CustomLinkWithBG
            title={t("reservation")}
            href={reservationLink}
            external
          />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
