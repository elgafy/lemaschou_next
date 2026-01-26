export type FAQSType = {
  id: number;
  question: string;
  answer: string;
}[];

export type HomeProps = {
  desc_home_seo: string;
  keywords_home_seo: string;
  reservation_link: string;
  menu_image: string;
  menu_text: string;
  faqs: FAQSType;
  video: string;
  venues: {
    id: number;
    image: string;
    is_main: string;
  }[];
  testimonials: {
    id: number;
    name: string;
    desc: string;
    job: string;
    image: string;
  }[];
};

export type venues = {
  desc_venue_seo: string;
  keywords_venue_seo: string;
  about: string;
  gallery: Gallery;
  events: Event;
  instagram: string;
  about_image: string;
  phone: string;
  email: string;
  working_from: string;
  working_to: string;
};

export type Event = {
  id: number;
  name: string;
  image: string;
}[];

export type Gallery = {
  id: number;
  image: string;
}[];

export type MenuData = {
  categories: CategoriesType;
  meals: Meals;
};

export type menuTypes = {
  active_ramadan_menu: string,
  desc_menu_seo: string;
  keywords_menu_seo: string;
  default_meals: Meals;
  image: string;
};

export type CategoriesType = {
  id: number;
  name_ar: string;
  name_en: string;
  grouped: boolean;
  is_ramadan?: boolean;
   title_en: string,
   title_ar: string

}[];

export type Meals = {
  grams?: any;
  id: number;
  name_ar: string;
  name_en: string;
  is_ramadan?: boolean;
  desc_ar: string;
  desc_en: string;
  image: string;
  price: string;
  category_id: number;
  category_name: string;
  featured_type: string;
}[];

export type AdsType = {
  desktop_image: string;
  mobile_image: string;
  show_one_time: boolean;
  link: string;
  ad_pages: {
    page: string;
  }[];
};

export type FAQStype = {
  desc_faq_seo: string;
  keywords_faq_seo: string;
  faqs: {
    id: number;
    question: string;
    answer: string;
  }[];
};
export type ReservationType = {
  desc_reservation_seo: string;
  keywords_reservation_seo: string;
  title: string;
};
export type TermsType = {
  desc_terms_seo: string;
  keywords_terms_seo: string;
  title: string;
  content: string;
};

export type ReservationSettings = {
  use_external_reservation_link: boolean;
  external_reservation_link: string;
}
export type Settings = {
  "ads" : {
    desktop_image: string;
    mobile_image: string;
    show_one_time: boolean;
    link: string;
    ad_pages: {
      page: string;
    }[];
  },
  "reservation": {
    use_external_reservation_link: boolean;
    external_reservation_link: string;
  },
  "footer": any
}