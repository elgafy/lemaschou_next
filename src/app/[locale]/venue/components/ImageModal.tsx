"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type props = {
  img: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
};

function ImageModal({ img, setShowModal, showModal }: props) {
  const ref = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && ref.current === event.target) {
        closeModal();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, display: "none" }}
      animate={
        showModal
          ? { opacity: 1, display: "flex" }
          : { opacity: 0, display: "none" }
      }
      exit={{ opacity: 0, display: "none" }}
      transition={{ duration: 0.3 }}
      className="w-full h-full fixed top-0 left-0 bg-black/50 z-50 flex items-center justify-center"
    >
      <button
        aria-label="close"
        onClick={closeModal}
        className="absolute top-3 left-3 text-white hover:text-red-300 transition-all duration-300 z-50"
      >
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
          className="lucide lucide-circle-x"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      </button>
      <div className=" relative  rounded-[12px] overflow-hidden w-[80%] h-[80%] bxs:w-[300px] bxs:h-[300px] lMobile:w-[400px] lMobile:h-[400px] ss:w-[350px] ss:h-[350px] amd:w-[500px] amd:h-[500px] flex items-center justify-center">
        {img && (
          <Image quality={100} src={img} alt="event image" sizes="100%" fill />
        )}
      </div>
    </motion.div>
  );
}

export default ImageModal;
