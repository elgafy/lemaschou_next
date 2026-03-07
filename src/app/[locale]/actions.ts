"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getData(url: string, locale: string) {
  const response = await fetch(process.env.BASE_URL + url, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: locale,
    },
  })
  return await response.json().then((data) => data.data);
}
export async function getMenuData(url: string, lang: string) {
  return await fetch(process.env.BASE_URL + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: lang,
    },
  })
    .then((res) => res.json())
    .then((data) => data.data);
}
export async function SendContact(name: string, phone: string, email: string) {
  const lang = (await cookies()).get("NEXT_LOCALE")?.value || "en";
  return await fetch(process.env.BASE_URL + "contact/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      lang,
    },
    body: JSON.stringify({ name, phone, email }),
  });
}



export async function updateMenuData(locale:string){
  revalidatePath("/"+locale+"/menu");
}
