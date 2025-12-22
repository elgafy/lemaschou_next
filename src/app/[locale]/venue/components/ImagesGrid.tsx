"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";

import { Gallery } from "../../AppTypes";
import ImageModal from "./ImageModal";

type props = {
  images: Gallery;
};

function ImagesGrid({ images }: props) {
  const [shoWModal, setShowModal] = useState<boolean>(false);
  const [img, setImg] = useState<string>("");

  const openModal = useCallback((img: string) => {
    setShowModal(true);
    setImg(img);
  }, []);
  return (
    <section className="w-full px-[90px] cll:px-10 grid grid-cols-12 gap-6 tablet:px-6 tablet:gap-2 blg:gap-4">
      <ImageModal img={img} showModal={shoWModal} setShowModal={setShowModal} />

      {images?.map((img, index) => (
        <button
          onClick={() => openModal(img.image)}
          type="button"
          aria-label="image button"
          key={img.id}
          className={`relative h-[270px] axs:h-[120px] cll:h-[260px] xlll:h-[220px] blg:h-[200px] lMobile:h-[134px] tablet:h-[150px] xs:h-[100px] rounded-[8px] overflow-hidden ${
            index === 1
              ? "col-span-6 "
              : index === 2
              ? "col-span-6"
              : index === 3 || index === 4
              ? "col-span-6"
              : "col-span-12 h-[500px] axs:h-[200px] xs:h-[150px] cll:h-[340px] xlll:h-[380px] blg:h-[260px]"
          }`}
        >
          <Image
            priority={false}
            src={img.image}
            alt="img"
            sizes={`${
              index === 0 || index === 5 || index === 6
                ? "100vw"
                : "(max-width: 600px) 100px, 500px"
            }`}
            fill
          />
        </button>
      ))}
    </section>
  );
}

export default ImagesGrid;
