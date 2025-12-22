import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL_WEBSITE}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${process.env.NEXT_PUBLIC_BASE_URL_WEBSITE}/en`,
          ar: `${process.env.NEXT_PUBLIC_BASE_URL_WEBSITE}/ar`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL_WEBSITE}/menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${process.env.NEXT_PUBLIC_BASE_URL_WEBSITE}/en/menu`,
          ar: `${process.env.NEXT_PUBLIC_BASE_URL_WEBSITE}/ar/menu`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL_WEBSITE}/venue`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${process.env.NEXT_PUBLIC_BASE_URL_WEBSITE}/en/venue`,
          ar: `${process.env.NEXT_PUBLIC_BASE_URL_WEBSITE}/ar/venue`,
        },
      },
    },
  ];
}
