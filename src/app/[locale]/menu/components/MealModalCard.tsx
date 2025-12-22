import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";

type props = {
  isRamadan?: boolean;

  locale?: string;
  currency: string;
  title: string;
  children?: React.ReactNode;
  buttonClassName?: string;
  calories?: string;
  menu?: boolean;
  lang?: string;
  meal: {
    grams?: any;
    calories?: string;
    id: number;
    name_ar: string;
    name_en: string;
    desc_ar: string;
    desc_en: string;
    image: string;
    price: string;
    category_id: number;
    category_name: string;
    featured_type: string;
  };
};

export function MealModalCard({
  title,
  buttonClassName,
  meal,
  children,
  menu,
  lang,
  locale,
  isRamadan
}: props) {
  return (
    <Dialog>
      <DialogTrigger aria-describedby="meal-modal" asChild>
        <Button
          dir={children ? (lang === "ar" ? "rtl" : "ltr") : ""}
          className={buttonClassName}
          variant="outline"
        >
          {menu ? children : title}
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="meal-modal"
        className=" w-[529px] h-[606px] lMobile:h-[60%]  lMobile:w-[90%] bxs:w-[290px] blg:h-[90%] bg-transparent border-none bg-[url('/assets/mealCard.png')] bg-[length:100%_100%] px-[45px]   flex flex-col gap-0 items-center justify-center  mobile:gap-5 pb-12 bxs:pb-0  bxs:h-[390px] lg:h-[500px] "
      >
        <DialogHeader className="hidden">
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            {lang === "ar" ? meal.name_ar : meal.name_en}
          </DialogDescription>
        </DialogHeader>
        {/* Content */}
        <DialogClose
          className="!absolute top-5 text-mainColor left-14 w-7 h-7 bxs:w-5 bxs:h-5 bxs:text-xs border border-mainColor rounded-full bxs:left-7"
          aria-label="Close"
        >
          X
        </DialogClose>
        {meal?.image !== "" && (
          <div className="w-[270px] h-[270px] blg:h-[200px] blg:w-[200px] rounded-full overflow-hidden relative lMobile:w-[250px]  lMobile:h-[250px] bxs:w-[160px] bxs:h-[160px] lg:w-[200px] lg:h-[200px]">
            <Image
              src={meal.image}
              alt="meal image"
              fill
              sizes="(max-width: 768px) 200px, (max-width: 1200px) 100px, 397px"
            />
          </div>
        )}
        <div className="w-full flex flex-col gap-2 ">
          <header>
            <h1
              dir={lang === "en" ? "ltr" : "rtl"}

              className="text-[32px] font-bold font-Rufina text-mainColor lMobile:text-xl blg:text-2xl bxs:text-sm">
              {locale
                ? locale === "en"
                  ? meal.name_en
                  : meal.name_ar
                : lang === "ar"
                  ? meal.name_ar
                  : meal.name_en}
            </h1>
            {!isRamadan && meal.grams && meal.grams >= 1 && (
                 <p className="flex flex-wrap w-full text-[#5C6574] font-medium text-sm tracking-wide leading-relaxed mobile:w-full lmd:w-full ss:text-xs lmb:text-[10px] opacity-80">
                 <span className="inline-flex items-center gap-1">
                   {lang === "en"? meal.grams + 'g' : meal.grams + ' غرام'}
                 </span>
               </p>
               )}
          </header>

          {!isRamadan && (
            <>
              <p
                dir={lang === "en" ? "ltr" : "rtl"}

                className="text-[#5C6574] font-normal text-sm lMobile:text-xs leading-[26.5px]">
                {lang === "ar" ? meal.desc_ar : meal.desc_en}
              </p>
              <div className="w-full flex items-center justify-between text-base ss:text-xs">
                <div
                  dir={lang === "en" ? "ltr" : "rtl"}

                  className="flex items-center gap-[6px] ">
                  <span className=" font-bold font-Rufina text-mainColor">
                    {locale
                      ? locale === "en"
                        ? "Calories"
                        : "السعرات الحرارية"
                      : lang === "ar"
                        ? "السعرات الحرارية"
                        : "Calories"}
                  </span>
                  <span className="font-normal">{meal.calories || 0}</span>
                </div>
                <div
                  className={` font-semibold text-mainColor  flex gap-2 items-center`}
                >
                  <span>    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
                    <g clipPath="url(#clip0_1561_159)">
                      <path d="M8.13931 12.7406C7.91043 13.2481 7.75913 13.7988 7.70117 14.3764L12.5448 13.3468C12.7737 12.8394 12.9249 12.2885 12.9829 11.7109L8.13931 12.7406Z" fill="#381112" />
                      <path d="M12.545 10.262C12.7738 9.75463 12.9251 9.20376 12.9831 8.62619L9.21006 9.42865V7.88603L12.5448 7.17736C12.7737 6.66996 12.925 6.11909 12.983 5.54152L9.20995 6.34329V0.795555C8.63181 1.12017 8.11836 1.55226 7.70099 2.06194V6.66414L6.19202 6.98487V0.0410156C5.61388 0.365514 5.10043 0.797722 4.68306 1.3074V7.30549L1.30675 8.02295C1.07786 8.53035 0.926452 9.08122 0.868376 9.65879L4.68306 8.84812V10.7908L0.59488 11.6595C0.365996 12.1669 0.214701 12.7178 0.156738 13.2954L4.43592 12.386C4.78427 12.3135 5.08366 12.1076 5.27832 11.8242L6.06309 10.6607V10.6605C6.14456 10.5401 6.19202 10.395 6.19202 10.2386V8.52738L7.70099 8.20665V11.2919L12.5448 10.2618L12.545 10.262Z" fill="#381112" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1561_159">
                        <rect width="12.8264" height="14.3353" fill="white" transform="translate(0.156982 0.0410156)" />
                      </clipPath>
                    </defs>
                  </svg> </span>
                  <span>{meal.price}</span>

                </div>
              </div>
            </>
          )}
        </div>
        {/* Content */}
        <DialogFooter className="hidden">
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// export default MealModalCard;
