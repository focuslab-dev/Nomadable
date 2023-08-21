/**
 * Type
 */

import { APP_URL } from "../../constants";

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
    latStart: 35.52216882517227,
    lngStart: 139.4753943886995,
    latEnd: 35.83167649546256,
    lngEnd: 139.91519623249354,
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

export const INDONESIA_JAKARTA: City = {
  slug: "indonesia-jakarta",
  country: "Indonesia",
  city: "Jakarta",
  boundary: {
    latStart: -6.39949082602466,
    lngStart: 106.60117286073415,
    latEnd: -5.998266160366967,
    lngEnd: 107.0449982672169,
  },
};

export const SPAIN_BARCELONA: City = {
  slug: "spain-barcelona",
  country: "Spain",
  city: "Barcelona",
  boundary: {
    latStart: 41.26111581428441,
    lngStart: 1.9848526109420845,
    latEnd: 41.50240708083459,
    lngEnd: 2.3455995419546127,
  },
};

export const UK_LONDON: City = {
  slug: "united-kingdom-london",
  country: "United Kingdom",
  city: "London",
  boundary: {
    latStart: 51.33170321721539,
    lngStart: -0.43164476256447415,
    latEnd: 51.689904379458056,
    lngEnd: 0.21001612629251554,
  },
};

export const SWITZERLAND_ZURICH: City = {
  slug: "switzerland-zurich",
  country: "Switzerland",
  city: "Zurich",
  boundary: {
    latStart: 47.3039155001768,
    lngStart: 8.415848876070925,
    latEnd: 47.442958867343805,
    lngEnd: 8.647291739323549,
  },
};

export const AUSTRIA_VIENNA: City = {
  slug: "austria-vienna",
  country: "Austria",
  city: "Vienna",
  boundary: {
    latStart: 48.078330653069855,
    lngStart: 16.161994240699045,
    latEnd: 48.319951148652876,
    lngEnd: 16.562865412550735,
  },
};

export const GREECE_ATHENS: City = {
  slug: "greece-athens",
  country: "Greece",
  city: "Athens",
  boundary: {
    latStart: 37.83812168821592,
    lngStart: 23.52552238413466,
    latEnd: 38.11123581227761,
    lngEnd: 23.896570810617362,
  },
};

export const SWITZERLAND_GENEVA: City = {
  slug: "switzerland-geneva",
  country: "Switzerland",
  city: "Geneva",
  boundary: {
    latStart: 46.11950308350393,
    lngStart: 6.018235698546164,
    latEnd: 46.27849296664036,
    lngEnd: 6.2787206133144196,
  },
};

export const JAPAN_KYOTO: City = {
  slug: "japan-kyoto",
  country: "Japan",
  city: "Kyoto",
  boundary: {
    latStart: 34.9466681508908,
    lngStart: 135.68344341472852,
    latEnd: 35.06173596820997,
    lngEnd: 135.8354709400984,
  },
};

export const JAPAN_FUKUOKA: City = {
  slug: "japan-fukuoka",
  country: "Japan",
  city: "Fukuoka",
  boundary: {
    latStart: 33.48064471164125,
    lngStart: 130.2353768746321,
    latEnd: 33.70729465157126,
    lngEnd: 130.53933975048704,
  },
};

export const JAPAN_OSAKA: City = {
  slug: "japan-osaka",
  country: "Japan",
  city: "Osaka",
  boundary: {
    latStart: 34.522523112575755,
    lngStart: 135.3000130355984,
    latEnd: 34.830969312215544,
    lngEnd: 135.69282121620847,
  },
};

export const INDONESIA_KUTA: City = {
  slug: "indonesia-kuta",
  country: "Indonesia",
  city: "Kuta",
  boundary: {
    latStart: -8.800554047785752,
    lngStart: 115.08131783787445,
    latEnd: -8.624222017451032,
    lngEnd: 115.27437334758162,
  },
};

export const JAPAN_NAGOYA: City = {
  slug: "japan-nagoya",
  country: "Japan",
  city: "Nagoya",
  boundary: {
    latStart: 35.036135119077954,
    lngStart: 136.70484691614553,
    latEnd: 35.3110311203299,
    lngEnd: 137.09076063286517,
  },
};

export const VIETNAM_DANANG: City = {
  slug: "vietnam-danang",
  country: "Vietnam",
  city: "Danang",
  boundary: {
    latStart: 15.928025992264182,
    lngStart: 108.05684205715772,
    latEnd: 16.192817479635806,
    lngEnd: 108.3702380056315,
  },
};

export const GERMANY_BERLIN: City = {
  slug: "germany-berlin",
  country: "Germany",
  city: "Berlin",
  boundary: {
    latStart: 52.37964429963128,
    lngStart: 13.14021022965892,
    latEnd: 52.639476618607745,
    lngEnd: 13.61830765298265,
  },
};
export const JAPAN_SAPPORO: City = {
  slug: "japan-sapporo",
  country: "Japan",
  city: "Sapporo",
  boundary: {
    latStart: 42.9565480813377,
    lngStart: 141.20156305116666,
    latEnd: 43.14931669676534,
    lngEnd: 141.51465094902812,
  },
};

export const NETHERLANDS_AMSTERDAM: City = {
  slug: "netherlands-amsterdam",
  country: "Netherlands",
  city: "Amsterdam",
  boundary: {
    latStart: 52.26942034481499,
    lngStart: 4.7026764000611365,
    latEnd: 52.46661719747118,
    lngEnd: 5.084198952185972,
  },
};

export const JAPAN_NAGASAKI: City = {
  slug: "japan-nagasaki",
  country: "Japan",
  city: "Nagasaki",
  boundary: {
    latStart: 32.70695598058404,
    lngStart: 129.80996317021874,
    latEnd: 32.78898319734627,
    lngEnd: 129.92356643205017,
  },
};

export const JAPAN_HIROSHIMA: City = {
  slug: "japan-hiroshima",
  country: "Japan",
  city: "Hiroshima",
  boundary: {
    latStart: 34.35383961782037,
    lngStart: 132.40276190502385,
    latEnd: 34.43439669115807,
    lngEnd: 132.5127634803851,
  },
};

export const COLOMBIA_MEDELLIN: City = {
  slug: "colombia-medellin",
  country: "Colombia",
  city: "Medellin",
  boundary: {
    latStart: 6.184369934265973,
    lngStart: -75.64689287478086,
    latEnd: 6.296550019047743,
    lngEnd: -75.5071604343739,
  },
};

export const CROATIA_SPLIT: City = {
  slug: "croatia-split",
  country: "Croatia",
  city: "Split",
  boundary: {
    latStart: 43.47265482032762,
    lngStart: 16.368765459344672,
    latEnd: 43.57358996230832,
    lngEnd: 16.541129655047342,
  },
};

export const JAPAN_YOKOHAMA: City = {
  slug: "japan-yokohama",
  country: "Japan",
  city: "Yokohama",
  boundary: {
    latStart: 35.42053781719126,
    lngStart: 139.5830263132429,
    latEnd: 35.4881943694768,
    lngEnd: 139.68414444529128,
  },
};

export const BRASIL_SAOPAULO: City = {
  slug: "brasil-saopaulo",
  country: "Brasil",
  city: "Sao Paulo",
  boundary: {
    latStart: -23.702401788629274,
    lngStart: -46.83229676389368,
    latEnd: -23.41842759589248,
    lngEnd: -46.455130550465725,
  },
};

export const CITIES: City[] = [
  /**
   * Eeast Asia
   */
  SOUTH_KOREA_SEOUL,
  JAPAN_TOKYO,
  JAPAN_KARUIZAWA,
  JAPAN_KYOTO,
  JAPAN_OSAKA,
  JAPAN_FUKUOKA,
  JAPAN_NAGOYA,
  JAPAN_SAPPORO,
  JAPAN_NAGASAKI,
  JAPAN_HIROSHIMA,
  JAPAN_YOKOHAMA,
  /**
   * South East Asia
   */
  THAILAND_BANGKOK,
  THAILAND_CHIANGMAI,
  INDONESIA_CANGGU,
  INDONESIA_JAKARTA,
  INDONESIA_KUTA,
  MALAYSIA_KUALA_LUMPUR,
  SINGAPORE_SINGAPORE,
  VIETNAM_DANANG,
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
  COLOMBIA_MEDELLIN,
  BRASIL_SAOPAULO,
  /**
   * Central Asia
   */
  UZBEKISTAN_TASHKENT,
  /**
   * East Europe
   */
  TURKEY_ISTANBUL,
  AUSTRIA_VIENNA,
  /**
   * West Europe
   */
  BELGIUM_BRUSSELS,
  UK_LONDON,
  SPAIN_BARCELONA,
  ITALY_ROME,
  SWITZERLAND_ZURICH,
  SWITZERLAND_GENEVA,
  GREECE_ATHENS,
  GERMANY_BERLIN,
  NETHERLANDS_AMSTERDAM,
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

export const CITY_LINKS = CITIES.map((city) => {
  return {
    url: `${APP_URL}/${city.slug}`,
    text: `${city.city}, ${city.country}`,
  };
});
