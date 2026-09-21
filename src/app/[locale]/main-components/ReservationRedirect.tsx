"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Rendered by the server when a reservation's payment status doesn't match the
// page being viewed. Shows a spinner immediately (so there's no blank screen)
// and then navigates client-side to the correct page.
export default function ReservationRedirect({ href }: { href: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(href);
  }, [href, router]);

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-black/50 ">
      <section className="relative">
        <div className="w-[203px] mobile:w-[150px] mobile:border-[10px] aspect-square rounded-full border-[30px]  z-50 border-white/30 border-r-mainColor animate-spin"></div>
      </section>
    </main>
  );
}
