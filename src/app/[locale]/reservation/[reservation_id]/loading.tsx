export default function Loading() {
  return (
    <main className="h-screen w-screen flex items-center justify-center bg-black/50 ">
      <section className="relative">
        <div className="w-[203px] mobile:w-[150px] mobile:border-[10px] aspect-square rounded-full border-[30px]  z-50 border-white/30 border-r-mainColor animate-spin"></div>
      </section>
    </main>
  );
}
