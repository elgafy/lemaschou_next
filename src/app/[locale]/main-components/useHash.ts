"use client";

import { useEffect, useState } from "react";

export const useHash = () => {
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHash(window.location.hash);

      const handleHashChange = () => {
        setHash(window.location.hash);
      };

      window.addEventListener("hashchange", handleHashChange);

      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }
  }, []);

  const updateHash = (newHash: string) => {
    if (typeof window !== "undefined") {
      setHash(`${newHash}`);
    }
  };
  const deleteHash = () => {
    if (typeof window !== "undefined") {
      setHash(``);
    }
  };

  return { hash, updateHash, deleteHash };
};
