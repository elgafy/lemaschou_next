"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LanguageChanger from "./LanguageChanger";
import logoEN from "/public/icons/en-logo.svg";
import logoAR from "/public/icons/ar-logo.svg";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchData } from "@/store/AssetsSlice";

type props = {
  locale: string;
  validPath: boolean;
};

function MobileMenu({ locale }: props) {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuOpening = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu, setShowMenu]);
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
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMenu]);

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
    <>
      <span className="hidden tablet:block">
        <Hamburger
          size={20}
          toggled={showMenu}
          onToggle={handleMenuOpening}
          color={"white"}
        />
      </span>
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: showMenu ? 1 : 0, x: showMenu ? 0 : "100%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.5 }}
        className="fixed w-full h-screen bg-mainColor/90 z-50 top-0 left-0 flex flex-col py-10 items-center justify-between pb-[25%] bxs:pb-[10%] "
      >
        <Link
          onClick={handleMenuOpening}
          className="w-[156px] h-[125px] bxs:w-[126px] bxs:h-[105px] relative"
          href={"/" + locale}
        >
          <Image
            priority
            src={locale === "ar" ? logoAR : logoEN}
            alt="logo"
            fill
            sizes="(max-width: 400px) 66px, 116px"
          />{" "}
        </Link>
        <button
          className="absolute top-4 left-4 font-lato w-8 h-8 rounded-full border text-2xl  z-50 text-white bxs:text-base"
          onClick={handleMenuOpening}
        >
          X
        </button>
        <ul className="w-full flex gap-5 flex-col items-center h-fit pt-0 font-Rufina text-3xl text-white ">
          {links.map((link, index) => {
            const isActive =
              pathname.replace(`/${locale}`, ``) ===
                "/" + link.link.toLowerCase() ||
              (index === 0 && pathname === "/" + locale) ||
              pathname.replace(`/${locale}`, ``) === link.active;

            return (
              <li
                className={isActive ? "underline underline-offset-[10px]" : ""}
                key={link.id}
              >
                <Link
                  className="text-xl ss:text-lg bxs:text-base "
                  onClick={handleMenuOpening}
                  href={link.href}
                >
                  {link.link}
                </Link>
              </li>
            );
          })}
        </ul>
        {bgImg && (
          <span className=" flex justify-center w-1/2 relative">
            <Image
              className="-z-10"
              src={bgImg}
              alt="language change image"
              fill
            />
            <LanguageChanger className="text-mainColor text-xs bxs:h-8" />
          </span>
        )}
      </motion.div>
    </>
  );
}

export default MobileMenu;
