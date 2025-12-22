"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function MicrosoftClarity() {
  useEffect(() => {
    Clarity.init("p52okofq3u");
  }, []);

  return null;
}
