import React from "react";
import TestimonialsSlider from "./components/TestimonialsSlider";
import { HomeProps } from "../AppTypes";

type props = {
  testimonials: HomeProps["testimonials"];
};

function Testimonials({ testimonials }: props) {
  return (
    <section className="custom-container">
      <TestimonialsSlider testimonials={testimonials} />
    </section>
  );
}

export default Testimonials;
