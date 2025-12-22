"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AdsType } from "../AppTypes";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { setAdPaths, setDecreaseViews, clearAdPaths } from "@/store/PathsSlice";
import Link from "next/link";

type props = {
  ads: AdsType;
  locale: string;
};

function AdComponent({ ads, locale }: props) {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const [imageAd, setImageAd] = useState<string>("");
  const pathName = usePathname();
  const visitedPath = useAppSelector((state) => state.paths.AdPathsState);
  const ad = visitedPath.find((item) => item.link === pathName);

  const [showAd, setShowAd] = useState<boolean>(true);

  const closeAd = useCallback(() => {
    dispatch(setDecreaseViews({ payload: { id: ad?.id as string } }));
    setShowAd(false);
  }, [ad?.id, dispatch]);

  useEffect(() => {
    if (!ads?.show_one_time) {
      dispatch(clearAdPaths());
    } else if (ads?.show_one_time && ad && ad?.numbersOfViews > 1) {
      dispatch(clearAdPaths());
    }

    ads?.ad_pages.map((page) =>
      dispatch(
        setAdPaths({
          payload: {
            id: page.page,
            link:
              page.page === "home"
                ? "/" + locale
                : "/" + locale + "/" + page.page,
            numbersOfViews: ads.show_one_time ? 1 : Number.MAX_SAFE_INTEGER,
          },
        })
      )
    );
  }, [dispatch, locale, ads]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && ref.current === event.target) {
        closeAd();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  useEffect(() => {
    const decreaseAd = () => {
      if (ads?.show_one_time) {
        const currentPath = visitedPath?.find((item) => item.link === pathName);
        dispatch(
          setDecreaseViews({ payload: { id: currentPath?.id as string } })
        );
      }
    };
    window.addEventListener("beforeunload", decreaseAd);

    return () => {
      window.removeEventListener("beforeunload", decreaseAd);
    };
  }, [ads?.show_one_time, dispatch, visitedPath, pathName]);

  useEffect(() => {
    setShowAd(true);
  }, [pathName]);

  // resetting ad image based on window size

  const windowWidth = window.innerWidth;

  useEffect(() => {
    if (windowWidth <= 600) {
      setImageAd(ads?.mobile_image);
    } else {
      setImageAd(ads?.desktop_image);
    }
  }, [windowWidth, ads]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, display: "none" }}
      animate={
        ads?.show_one_time
          ? ad && ad?.numbersOfViews > 0
            ? { opacity: 1, display: "flex" }
            : { opacity: 0, display: "none" }
          : showAd && ad
          ? { opacity: 1, display: "flex" }
          : { opacity: 0, display: "none" }
      }
      exit={{ opacity: 0, display: "none" }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-screen h-screen bg-black/40 z-50 flex items-center justify-center"
    >
      <div className="w-[800px] bxs:w-[300px] mobile:w-[380px] ss:w-[400px] dmd:w-[500px] lmd:w-[600px] aspect-square relative overflow-hidden rounded-lg">
        {imageAd &&
          (ads?.link === "" ? (
            <Image
              src={imageAd}
              alt={ads?.link}
              quality={100}
              fill
              sizes="(max-width: 600px) 486px, 747px"
              priority
              className="object-fill "
            />
          ) : (
            <Link href={ads?.link} target="_blank" title={ads?.link}>
              <Image
                src={imageAd}
                alt={ads?.link}
                fill
                quality={100}
                sizes="(max-width: 600px) 486px, 747px"
                priority
                className="object-fill "
              />
            </Link>
          ))}
        <button
          onClick={closeAd}
          aria-label="close button"
          className="absolute top-4 left-4 z-50 bg-white w-7 h-7 ss:w-5 ss:h-5 ss:top-3 ss:left-3 ss:text-xs text-mainColor border border-white rounded-full"
        >
          x
        </button>
      </div>
    </motion.section>
  );
}

export default AdComponent;
