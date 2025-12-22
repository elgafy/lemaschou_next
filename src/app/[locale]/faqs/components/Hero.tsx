import React from "react";
import logoWord from "/public/assets/logo-word.svg";
import Image from "next/image";
import styles from "../styles.module.css";
import faqImg from "/public/assets/faqImg.png";

function Hero() {
  return (
    <section className={styles.hero}>
      <Image className="ss:!h-[105%]" src={faqImg} alt="faqImg" fill />
      <Image
        priority
        src={logoWord}
        alt="logo word image"
        sizes="(max-width: 600px) 186px, 447px"
        layout="intrinsic"
        className="mobile:w-[80%] bxs:w-[70%]"
      />{" "}
    </section>
  );
}

export default Hero;
