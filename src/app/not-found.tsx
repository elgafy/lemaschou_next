"use client";
import Image from "next/image";
import "./[locale]/globals.css";
import topFlower from "/public/assets/flowerBG.png";
import tree from "/public/assets/tree.png";
import whiteTree from "/public/assets/white-tree.png";
import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="h-screen bg-[#E9DED7] w-screen relative flex items-center justify-center">
          <div className="absolute grid grid-cols-4 z-10 border border-mainColor/20 top-0 w-[calc(100%-312px)] left-1/2 -translate-x-1/2 h-full ss:w-[calc(100%-50px)] clg:w-[calc(100%-150px)]">
            <span className="col-span-1 border-r-2 border-dashed border-mainColor/20"></span>
            <span className="col-span-1 border-r-2 border-dashed border-mainColor/20"></span>
            <span className="col-span-1 border-r-2 border-dashed border-mainColor/20"></span>
            <span className="col-span-1"></span>
          </div>
          <span className="absolute -top-14 right-0 w-[315px] h-[300px] ss:w-[136px] ss:h-[158px] ss:top-[100px]">
            <Image
              className="opacity-20"
              src={topFlower}
              fill
              alt="flower top"
              sizes="(max-width: 600px) 186px, 315px"
            />
          </span>
          <span className="absolute bottom-0 left-0 w-[252px] h-[342px] ss:w-[161px] ss:h-[196px] clg:h-[250px] clg:w-[180px]">
            <Image
              className="opacity-20"
              src={tree}
              fill
              alt="bottom tree"
              sizes="(max-width: 600px) 186px, 315px"
            />
          </span>
          <span className="absolute bottom-[150px] left-0 w-[252px] h-[342px] ss:w-[151px] ss:h-[196px] clg:h-[250px] clg:w-[180px]">
            <Image
              className="opacity-20"
              src={whiteTree}
              fill
              alt="top tree"
              sizes="(max-width: 600px) 186px, 315px"
            />
          </span>
          <section className="flex flex-col items-center text-mainColor z-20 lg:gap-3">
            <header className="flex flex-col items-center lg:gap-3 ">
              <h2 className="font-Rufina  text-7xl font-bold ss:text-3xl ltablet:text-4xl clg:text-5xl lg:text-6xl mobile:text-2xl">
                404
              </h2>
              <h1 className="font-normal font-Rufina text-[64px] ss:text-2xl clg:text-4xl ltablet:text-3xl lg:text-5xl">
                Page Not Found
              </h1>
            </header>
            <p className="font-normal text-2xl w-[65%] text-center ss:text-xs ss:w-3/4 lg:text-lg ltablet:text-base">
              we’re sorry. the page you requested could no be found Please go
              back to the home page
            </p>
            <Link
              replace
              href={"/"}
              className="bg-[url('/assets/button-with-whiteBG.png')] bg-[length:100%_100%] flex items-center justify-center w-[264px] mt-7 h-[55px] text-mainColor font-[Rufina] text-base ss:w-[173px] ss:h-[36px] ss:text-xs"
            >
              GO HOME
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
