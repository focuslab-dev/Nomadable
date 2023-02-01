/**
 * Type
 */

export interface Boundary {
  latStart: number;
  lngStart: number;
  latEnd: number;
  lngEnd: number;
}

export interface City {
  slug: string;
  country: string;
  city: string;
  boundary: Boundary | null;
  // center: { lat: number; lng: number };
  thumbnail?: string;
}

export interface CityMetaData {
  slug: string;
  spotCnt: number;
  avgSpeed: number;
}

export interface CityWithData extends City {
  spotCnt: number;
  avgSpeed: number;
}

/**
 * Cities
 */

const IMAGE_PATH = "/img/cities";

export const THAILAND_BANGKOK: City = {
  slug: "thailand-bangkok",
  country: "Thailand",
  city: "Bangkok",
  boundary: {
    latStart: 13.672981477425537,
    lngStart: 100.46799149310829,
    latEnd: 13.79455979333963,
    lngEnd: 100.62824274505061,
  },
  // center: { lat: 13.732659608344978, lng: 100.54471042062359 },
  thumbnail: `${IMAGE_PATH}/thailand-bangkok.jpg`,
};

export const THAILAND_CHIANGMAI: City = {
  slug: "thailand-chiangmai",
  country: "Thailand",
  city: "Chiang Mai",
  boundary: {
    latStart: 18.758529348325865,
    lngStart: 98.94571798180516,
    latEnd: 18.817653026659116,
    lngEnd: 99.02568099469926,
  },
  // center: { lat: 18.76022003414657, lng: 98.98601517771374 },
  thumbnail: `${IMAGE_PATH}/thailand-chiangmai.jpg`,
};

export const INDONESIA_CANGGU: City = {
  slug: "indonesia-canggu",
  country: "Indonesia",
  city: "Canggu",
  boundary: {
    latStart: -8.707071696141014,
    lngStart: 115.07572211994403,
    latEnd: -8.60429808302807,
    lngEnd: 115.2004462734472,
  },
  // center: { lat: -8.653273825526307, lng: 115.13478074413004 },
  thumbnail: `${IMAGE_PATH}/indonesia-canggu.jpg`,
};

export const PERU_LIMA: City = {
  slug: "peru-lima",
  country: "Peru",
  city: "Lima",
  boundary: {
    latStart: -12.309968109283844,
    lngStart: -77.34866767524159,
    latEnd: -11.848931715227906,
    lngEnd: -76.7449859403346,
  },
  // center: { lat: -12.046067197261035, lng: -77.04477146758003 },
  thumbnail: `${IMAGE_PATH}/peru-lima.jpg`,
};

export const CANADA_VANCUBER: City = {
  slug: "canada-vancouver",
  country: "Canada",
  city: "Vancouver",
  boundary: {
    latStart: 49.06904929903996,
    lngStart: -123.35248601373657,
    latEnd: 49.39535206379091,
    lngEnd: -122.75296120963932,
  },
};

export const USA_NEW_YORK: City = {
  slug: "usa-new_york",
  country: "USA",
  city: "New York",
  boundary: {
    latStart: 40.54667681393454,
    lngStart: -74.24563592537136,
    latEnd: 40.8745391712454,
    lngEnd: -73.72670426372198,
  },
};

export const SOUTH_KOREA_SEOUL: City = {
  slug: "south_korea-seoul",
  country: "South Korea",
  city: "Seoul",
  boundary: {
    latStart: 37.411461495836576,
    lngStart: 126.78164407951601,
    latEnd: 37.6876155700223,
    lngEnd: 127.17061851195638,
  },
};

export const JAPAN_TOKYO: City = {
  slug: "japan-tokyo",
  country: "Japan",
  city: "Tokyo",
  boundary: {
    latStart: 35.601898825977486,
    lngStart: 139.64312141126504,
    latEnd: 35.756014725290996,
    lngEnd: 139.8549962528498,
  },
};

export const MALAYSIA_KUALA_LUMPUR: City = {
  slug: "malaysia-kuala_lumpur",
  country: "Malaysia",
  city: "Kuala Lumpur",
  boundary: {
    latStart: 3.029225521625051,
    lngStart: 101.57264492776164,
    latEnd: 3.2522847314116916,
    lngEnd: 101.81063093782183,
  },
};

export const NEPAL_KATHMANDU: City = {
  slug: "nepal-kathmandu",
  country: "Nepal",
  city: "Kathmandu",
  boundary: {
    latStart: 27.647187383730724,
    lngStart: 85.24605637850743,
    latEnd: 27.76800341116551,
    lngEnd: 85.39143370802088,
  },
};

export const ITALY_ROME: City = {
  slug: "italy-rome",
  country: "Italy",
  city: "Rome",
  boundary: {
    latStart: 41.5938809690432,
    lngStart: 12.053516911437526,
    latEnd: 42.186241162210536,
    lngEnd: 12.9012258134006,
  },
};

export const AUSTRALIA_MELBOURNE: City = {
  slug: "australia-melbourne",
  country: "Australia",
  city: "Melbourne",
  boundary: {
    latStart: -37.88662402859139,
    lngStart: 144.8600930460484,
    latEnd: -37.759599725114406,
    lngEnd: 145.06871027684593,
  },
};

export const SOUTH_AFRICA_JOHANNESBURG: City = {
  slug: "south_africa-johannesburg",
  country: "South Africa",
  city: "Johannesburg",
  boundary: {
    latStart: -26.863921174388345,
    lngStart: 27.234980504189394,
    latEnd: -25.61866281534857,
    lngEnd: 28.79070328280011,
  },
};

export const TURKEY_ISTANBUL: City = {
  slug: "turkey-istanbul",
  country: "Turkey",
  city: "Istanbul",
  boundary: {
    latStart: 40.903394793472074,
    lngStart: 28.755207808988303,
    latEnd: 41.19181317353488,
    lngEnd: 29.185512741521393,
  },
};

export const JAPAN_KARUIZAWA: City = {
  slug: "japan-karuizawa",
  country: "Japan",
  city: "Karuizawa",
  boundary: {
    latStart: 36.30852732237699,
    lngStart: 138.55645389526575,
    latEnd: 36.384550226825894,
    lngEnd: 138.65891795112032,
  },
};

export const BELGIUM_BRUSSELS: City = {
  slug: "belgium-brussels",
  country: "Belgium",
  city: "Brussels",
  boundary: {
    latStart: 50.759490945527716,
    lngStart: 4.219263416483102,
    latEnd: 50.91968049513471,
    lngEnd: 4.5002442643828715,
  },
};

export const AUSTRALIA_SYDNEY: City = {
  slug: "australia-sydney",
  country: "Australia",
  city: "Sydney",
  boundary: {
    latStart: -33.982142239207725,
    lngStart: 151.05374860268017,
    latEnd: -33.76793128621469,
    lngEnd: 151.34270355731297,
  },
};

export const UZBEKISTAN_TASHKENT: City = {
  slug: "uzbekistan-tashkent",
  country: "Uzbekistan",
  city: "Tashkent",
  boundary: {
    latStart: 41.15451243262166,
    lngStart: 69.05687969272182,
    latEnd: 41.44154507131711,
    lngEnd: 69.50476252984421,
  },
};

export const SINGAPORE_SINGAPORE: City = {
  slug: "singapore-singapore",
  country: "Singapore",
  city: "Singapore",
  boundary: {
    latStart: 1.1715180023327036,
    lngStart: 103.660650401407,
    latEnd: 1.4705661093483968,
    lngEnd: 103.98100026899175,
  },
};

export const UAE_DUBAI: City = {
  slug: "united-arab-emirates-dubai",
  country: "United Arab Emirates",
  city: "Dubai",
  boundary: {
    latStart: 24.713733057703138,
    lngStart: 54.750727640180145,
    latEnd: 25.474976269895706,
    lngEnd: 55.67418357569278,
  },
};

export const CITIES: City[] = [
  /**
   * Eeast Asia
   */
  SOUTH_KOREA_SEOUL,
  JAPAN_TOKYO,
  JAPAN_KARUIZAWA,
  /**
   * South East Asia
   */
  THAILAND_BANGKOK,
  THAILAND_CHIANGMAI,
  INDONESIA_CANGGU,
  MALAYSIA_KUALA_LUMPUR,
  SINGAPORE_SINGAPORE,
  /**
   * South Asia
   */
  NEPAL_KATHMANDU,
  /**
   * North America
   */
  CANADA_VANCUBER,
  USA_NEW_YORK,
  /**
   * South America
   */
  PERU_LIMA,
  /**
   * Central Asia
   */
  UZBEKISTAN_TASHKENT,
  /**
   * East Europe
   */
  ITALY_ROME,
  TURKEY_ISTANBUL,
  /**
   * West Europe
   */
  BELGIUM_BRUSSELS,
  /**
   * Oceanian
   */
  AUSTRALIA_SYDNEY,
  AUSTRALIA_MELBOURNE,
  /**
   * Africa
   */
  SOUTH_AFRICA_JOHANNESBURG,
  /**
   * Middle East
   */
  UAE_DUBAI,
];
