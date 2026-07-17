/* ──────────────────────────────────────────────────────────────
   Blue Moon Content Model
   All business information centralized for easy updates
   ────────────────────────────────────────────────────────────── */

export interface MenuItem {
  name: string;
  category: string;
  description?: string;
  price?: number;
  availableAfter?: string;
  featured?: boolean;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  district: string;
  state: string;
  postalCode: string;
}

export interface BusinessContent {
  name: string;
  descriptor: string;
  tagline: string;
  city: string;
  address: Address;
  phone: string;
  instagram: string;
  coordinates: { lat: number; lng: number };
  mapUrl: string;
  openingHours: string[];
  establishedYear?: string;
  fssai: string;
}

export const blueMoonContent: BusinessContent = {
  name: "Blue Moon",
  descriptor: "Bar & Kitchen",
  tagline: "Pala, after dark.",
  city: "Pala",
  address: {
    line1: "20/385, T.B. Road",
    city: "Pala",
    district: "Kottayam",
    state: "Kerala",
    postalCode: "686575",
  },
  phone: "+91 94470 52202",
  instagram: "@hotel_bluemoon_pala",
  coordinates: {
    lat: 9.71368,
    lng: 76.68428,
  },
  mapUrl: "https://maps.google.com/?q=9.71368,76.68428",
  openingHours: [],
  establishedYear: "1969",
  fssai: "11323005000154",
};

export const foodMenu: MenuItem[] = [
  // Featured Kerala Beef
  {
    name: "Beef Dry Fry",
    category: "Kerala Beef",
    featured: true,
  },
  {
    name: "Beef Kurumulaku Fry",
    category: "Kerala Beef",
    featured: true,
  },
  {
    name: "Beef Roast",
    category: "Kerala Beef",
  },
  {
    name: "Beef Coconut Fry",
    category: "Kerala Beef",
  },
  {
    name: "Beef Masala",
    category: "Kerala Beef",
  },
  {
    name: "Beef Kondattam",
    category: "Starters",
  },
  {
    name: "Honey-Glazed Beef",
    category: "Starters",
  },
  
  // Pork
  {
    name: "Pork Fry",
    category: "Pork",
    featured: true,
  },
  {
    name: "Pork Roast",
    category: "Pork",
  },
  {
    name: "Pork Masala",
    category: "Pork",
  },
  
  // Chicken
  {
    name: "Chicken 65",
    category: "Chicken",
    featured: true,
  },
  {
    name: "Chilly Chicken",
    category: "Indo-Chinese",
  },
  {
    name: "Travancore Chicken Fry",
    category: "Chicken",
    featured: true,
  },
  {
    name: "Chicken Curry",
    category: "Chicken",
  },
  {
    name: "Chicken Roast",
    category: "Chicken",
  },
  {
    name: "Pepper Chicken Masala",
    category: "Chicken",
  },
  {
    name: "Chicken Kondattam",
    category: "Starters",
  },
  {
    name: "Dragon Chicken",
    category: "Indo-Chinese",
  },
  {
    name: "Drums of Heaven",
    category: "Indo-Chinese",
  },
  
  // Seafood
  {
    name: "Fish Fry",
    category: "Seafood",
    featured: true,
  },
  {
    name: "Prawns Roast",
    category: "Seafood",
    featured: true,
  },
  {
    name: "Squid Roast",
    category: "Seafood",
  },
  {
    name: "Fish Curry",
    category: "Seafood",
  },
  {
    name: "Kozhuva Fry",
    category: "Seafood",
  },
  {
    name: "Neymeen Fry",
    category: "Seafood",
  },
  {
    name: "Fish Mango Curry",
    category: "Seafood",
  },
  {
    name: "Prawns Masala",
    category: "Seafood",
  },
  {
    name: "Squid Fry",
    category: "Seafood",
  },
  {
    name: "Squid Masala",
    category: "Seafood",
  },
  {
    name: "Prawns Fry",
    category: "Starters",
  },
  {
    name: "Prawns Tawa Fry",
    category: "Starters",
  },
  {
    name: "Butterfly Shrimp",
    category: "Starters",
  },
  
  // Biriyani & Rice
  {
    name: "Chicken Biriyani",
    category: "Rice",
    featured: true,
  },
  {
    name: "Pothi Choru",
    category: "Rice",
    featured: true,
  },
  
  // Porotta Specials
  {
    name: "Kizhi Porotta Beef",
    category: "Porotta",
  },
  {
    name: "Kizhi Porotta Chicken",
    category: "Porotta",
  },
  {
    name: "Kothu Porotta Beef",
    category: "Porotta",
  },
  {
    name: "Kothu Porotta Chicken",
    category: "Porotta",
  },
  
  // Evening Tandoor (available after 5 PM)
  {
    name: "Al Faham Chicken",
    category: "Tandoor",
    availableAfter: "5:00 PM",
    featured: true,
  },
  {
    name: "Tandoori Chicken",
    category: "Tandoor",
    availableAfter: "5:00 PM",
  },
  {
    name: "Chicken Tikka",
    category: "Tandoor",
    availableAfter: "5:00 PM",
  },
  
  // Vegetarian
  {
    name: "Mushroom Pepper Fry",
    category: "Vegetarian",
  },
  {
    name: "Paneer Pepper Fry",
    category: "Vegetarian",
  },
];

export const drinksMenu = [
  {
    category: "Beer",
    items: ["Available – ask for selection"],
  },
  {
    category: "Wine",
    items: ["Available – ask for selection"],
  },
  {
    category: "Fresh Juices",
    items: ["Lime", "Mango", "Pineapple", "Watermelon"],
  },
  {
    category: "Hot Beverages",
    items: ["Coffee", "Tea"],
  },
];

export const galleryImages: { src: string; alt: string; category: string }[] = [
  // Placeholder structure - will be populated with real images
];

export const aboutText = {
  intro: "A familiar stop on T.B. Road.",
  description:
    "Blue Moon brings together Kerala favourites, Indo-Chinese plates and an easy-going evening atmosphere in the centre of Pala.",
  evening:
    "The evening menu begins at five. Al Faham, Tandoori Chicken, Chicken Tikka and fresh Naan join the kitchen.",
};
