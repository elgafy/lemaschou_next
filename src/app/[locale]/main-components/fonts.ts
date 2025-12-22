import localFont from "next/font/local";
export const resort = localFont({
  src: [
    {
      path: "../../../../public/fonts/Fontspring-DEMO-resort-sanslight.otf",
      weight: "300",
    },
    
  ],
  variable: "--font-resort",
});

export const minaret = localFont({
  src: [
    {
      path: "../../../../public/fonts/GE-Minaret-Medium.ttf",
      weight: "500",
    },
    
  ],
  variable: "--font-minaret",
});
