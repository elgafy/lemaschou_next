import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import logoEN from "/public/icons/en-logo.svg";
import logoAR from "/public/icons/ar-logo.svg";

type props = {
  phone: string;
  email: string;
  address: string;
  instagram: string;
  working_from: string;
  working_to: string;
};

function Footer({
  phone,
  email,
  address,
  instagram,
  working_from,
  working_to,
}: props) {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="w-full bg-mainColor tablet:py-10 tablet:px-4 py-[28px] px-[163px] flex flex-col gap-[105px] tablet:gap-8 text-white clg:px-10 clg:py-10 lg:px-10 xl:px-14 xl:py-14 xlll:px-16 bxs:py-8 bxs:justify-center">
      <div className="w-full flex gap-[118px] items-center justify-between tablet:flex-col tablet:grid-cols-1 tablet:gap-8 tablet:justify-items-center clg:gap-10">
        <Link
          title="home"
          aria-label="home page"
          href={"/" + locale}
          className="w-[251px] h-[190px] tablet:h-[100px]  flex items-center justify-center relative lMobile:w-[140px] lMobile:h-[90px] bxs:w-[120px] bxs:h-[80px]"
        >
          <Image
            src={locale === "en" ? logoEN : logoAR}
            alt="logo"
            sizes="171px"
            fill
            priority
          />
        </Link>
        <div className="flex flex-col gap-[41px] tablet:gap-8 tablet:items-center mobile:gap-6">
          <div className="grid grid-cols-2 gap-6 ss:gap-3 text-sm font-Rufina tablet:text-center tablet:items-center xs:text-xs">
            <div className="col-span-1 flex gap-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail-open shrink-0 bxs:w-5 bxs:h-5"
              >
                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
              </svg>
              <div className="flex flex-col gap-2 items-start">
                <h2 className="text-base uppercase bxs:text-sm">
                  {t("email")}
                </h2>
                <Link
                  title="email"
                  aria-label="email link"
                  className="w-fit text-start ss:text-xs bxs:text-[10px]"
                  href={`mailto:${email}`}
                >
                  {email}
                </Link>
              </div>
            </div>
            <div className="col-span-1 flex gap-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock-3 shrink-0 bxs:w-5 bxs:h-5"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16.5 12" />
              </svg>
              <div className="flex flex-col gap-2 items-start">
                <h2 className="text-base uppercase bxs:text-xs">{t("time")}</h2>
                <span className="font-normal text-start ss:text-xs bxs:text-[10px]">
                  {t("from")}: {working_from} - {t("to")}: {working_to}
                </span>
              </div>
            </div>
            <div className="col-span-1 flex gap-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-phone-call shrink-0 bxs:w-5 bxs:h-5"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                <path d="M14.05 2a9 9 0 0 1 8 7.94" />
                <path d="M14.05 6A5 5 0 0 1 18 10" />
              </svg>
              <div className="flex flex-col gap-2 items-start">
                <h2 className="text-base uppercase bxs:text-sm">
                  {t("phone")}
                </h2>
                <Link
                  dir="ltr"
                  title="phone"
                  aria-label="phone link"
                  className="w-fit mb-1 text-center  ss:text-xs bxs:text-[10px] "
                  href={`tel:${phone}`}
                >
                  {phone}
                </Link>
              </div>
            </div>
            <div className="col-span-1 flex gap-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin shrink-0 bxs:w-5 bxs:h-5"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="flex flex-col gap-2 items-start">
                <h2 className="text-base uppercase bxs:text-sm">
                  {t("location")}
                </h2>
                <Link
                  title="map"
                  aria-label="map link"
                  className="w-full tablet:w-full xlll:w-full text-start ss:text-xs bxs:text-[10px]"
                  target="_blank"
                  href={
                    "https://www.google.com/maps/dir//Le+Maschou+Restaurant,+Tayma+St,+Al+Safarat,+Riyadh+12513,+Saudi+Arabia/@28.5474891,33.9978704,5z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3e2f1d16f36396c7:0xa6fd1cd0be8d1710!2m2!1d46.6287991!2d24.6931826!3e0?hl=en&entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D"
                  }
                >
                  {address}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between  tablet:gap-3 border-t border-dashed pt-3 border-white relative">
        <div className="flex flex-col gap-2 ">
          <span className="text-sm font-light font-lato xs:text-xs">
            {t("owned")}
          </span>
          <span className="text-sm font-light font-lato xs:text-xs">
            {t("copyright")}
          </span>
          <div className=" w-full text-xs font-lato flex items-center gap-1">
            {t("developed")}
            <Link href={"https://www.pixelcrafters.tech"}>
              www.pixelcrafters.tech
            </Link>
          </div>
        </div>
        <Link
          title="instagram"
          aria-label="instagram link"
          target="_blank"
          href={instagram}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="29"
            viewBox="0 0 19 19"
            fill="none"
            className="bxs:w-[22px] bxs:h-[22px] "
          >
            <g clipPath="url(#clip0_565_1443)">
              <path
                d="M9.90511 2.40832C12.2881 2.40832 12.5703 2.41877 13.5075 2.46058C14.3784 2.4989 14.8488 2.64523 15.1623 2.76716C15.5769 2.92742 15.8765 3.12252 16.1866 3.43259C16.5001 3.74614 16.6917 4.04227 16.852 4.45686C16.9739 4.77041 17.1203 5.24422 17.1586 6.11171C17.2004 7.05236 17.2108 7.33456 17.2108 9.71406C17.2108 12.097 17.2004 12.3792 17.1586 13.3164C17.1203 14.1874 16.9739 14.6577 16.852 14.9713C16.6917 15.3858 16.4966 15.6855 16.1866 15.9955C15.873 16.3091 15.5769 16.5007 15.1623 16.661C14.8488 16.7829 14.375 16.9292 13.5075 16.9675C12.5668 17.0093 12.2846 17.0198 9.90511 17.0198C7.52212 17.0198 7.23993 17.0093 6.30276 16.9675C5.43178 16.9292 4.96146 16.7829 4.64791 16.661C4.23332 16.5007 3.93371 16.3056 3.62364 15.9955C3.31009 15.682 3.11847 15.3858 2.95821 14.9713C2.83628 14.6577 2.68995 14.1839 2.65163 13.3164C2.60983 12.3758 2.59937 12.0936 2.59937 9.71406C2.59937 7.33107 2.60983 7.04888 2.65163 6.11171C2.68995 5.24073 2.83628 4.77041 2.95821 4.45686C3.11847 4.04227 3.31357 3.74266 3.62364 3.43259C3.93719 3.11904 4.23332 2.92742 4.64791 2.76716C4.96146 2.64523 5.43527 2.4989 6.30276 2.46058C7.23993 2.41877 7.52212 2.40832 9.90511 2.40832ZM9.90511 0.802246C7.4838 0.802246 7.1807 0.812698 6.2296 0.854505C5.28198 0.896311 4.63049 1.0496 4.06609 1.26909C3.47732 1.49903 2.97912 1.80212 2.4844 2.30032C1.98621 2.79504 1.68311 3.29323 1.45317 3.87853C1.23368 4.4464 1.08039 5.09441 1.03859 6.04203C0.99678 6.99662 0.986328 7.29972 0.986328 9.72103C0.986328 12.1423 0.99678 12.4454 1.03859 13.3965C1.08039 14.3442 1.23368 14.9956 1.45317 15.56C1.68311 16.1488 1.98621 16.647 2.4844 17.1417C2.97912 17.6364 3.47732 17.943 4.06261 18.1695C4.63049 18.389 5.27849 18.5423 6.22611 18.5841C7.17722 18.6259 7.48032 18.6363 9.90162 18.6363C12.3229 18.6363 12.626 18.6259 13.5771 18.5841C14.5248 18.5423 15.1762 18.389 15.7406 18.1695C16.3259 17.943 16.8241 17.6364 17.3188 17.1417C17.8136 16.647 18.1201 16.1488 18.3466 15.5635C18.5661 14.9956 18.7194 14.3476 18.7612 13.4C18.803 12.4489 18.8134 12.1458 18.8134 9.72451C18.8134 7.3032 18.803 7.0001 18.7612 6.049C18.7194 5.10138 18.5661 4.44989 18.3466 3.8855C18.1271 3.29323 17.824 2.79504 17.3258 2.30032C16.8311 1.80561 16.3329 1.49903 15.7476 1.27257C15.1797 1.05309 14.5317 0.899795 13.5841 0.857988C12.6295 0.812698 12.3264 0.802246 9.90511 0.802246Z"
                fill="white"
              />
              <path
                d="M9.9053 5.13953C7.37599 5.13953 5.32397 7.19154 5.32397 9.72085C5.32397 12.2502 7.37599 14.3022 9.9053 14.3022C12.4346 14.3022 14.4866 12.2502 14.4866 9.72085C14.4866 7.19154 12.4346 5.13953 9.9053 5.13953ZM9.9053 12.6926C8.26438 12.6926 6.93354 11.3618 6.93354 9.72085C6.93354 8.07994 8.26438 6.74909 9.9053 6.74909C11.5462 6.74909 12.8771 8.07994 12.8771 9.72085C12.8771 11.3618 11.5462 12.6926 9.9053 12.6926Z"
                fill="white"
              />
              <path
                d="M15.7375 4.9586C15.7375 5.55086 15.2567 6.02815 14.6679 6.02815C14.0757 6.02815 13.5984 5.54738 13.5984 4.9586C13.5984 4.36633 14.0792 3.88904 14.6679 3.88904C15.2567 3.88904 15.7375 4.36982 15.7375 4.9586Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_565_1443">
                <rect
                  width="17.8376"
                  height="17.8376"
                  fill="white"
                  transform="translate(0.986328 0.802246)"
                />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
