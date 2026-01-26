"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchData } from "@/store/AssetsSlice";
import Image from "next/image";

type props = {
  href: string;
  className?: string;
  external?: boolean;
  title: string;
};

function CustomLinkWithBG({ href, className, external, title }: props) {
  const locale = useLocale();
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
    bgImg && (
      <Link
        aria-label={title}
        target={external ? "_blank" : "_self"}
        className={cn(
          " bg-[length:100%_100%] flex items-center justify-center w-[170px] h-[48px] text-mainColor z-10 font-[Rufina] mobile:h-[31px] mobile:w-[108px] mobile:text-sm relative",
          className
        )}
        href={external ? href : "/" + locale + "/" + href}
      >
        {title}
        <Image
          src={bgImg}
          alt="menu image"
          fill
          className=" h-full -z-10 w-full object-cover "
        />
      </Link>
    )
  );
}

export default CustomLinkWithBG;
