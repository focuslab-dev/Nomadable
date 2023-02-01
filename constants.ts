const prod = process.env.NODE_ENV === "production";

// console.log("process.env.NODE_ENV", process.env.NODE_ENV);
// console.log("process.env.NODE_ENV_NEXT", process.env.NODE_ENV_NEXT);

/**
 * Basic
 */

export const APP_URL = prod ? "https://nomadable.net" : "http://localhost:3000";
export const APP_HOST = prod ? "nomadable.net" : "localhost";
export const APP_PORT = prod ? 80 : 3000;

export const APP_NAME = "Nomadable";
export const APP_OBP_IMAGE = `${APP_URL}/img/brand/brandogp4.jpg`;
export const PATH_COUNTRY_IMGS = `${APP_URL}/img/country/`;

export const APP_SHORT_DESCRIPTION =
  "Find Cafes & Coworking Spaces for Digital Nomads";
export const APP_LONG_DESCRIPTION =
  "Find cafes, co-working spaces, hotels with high-speed WiFi access.";

export const MSG_NOT_LOGIN = "Please login to use this feature.";

export const GAPI_CLIENT_ID =
  "397305107163-623um4m3q1uefhks3l87ph0sc5qaunf4.apps.googleusercontent.com";

/**
 * Colors
 */
export const BG_COLOR = "#fff";

/**
 * Layouts
 */
export const WIDTH_SMALL_PHONE = 400;
export const WIDTH_PHONE = 600;
export const WIDTH_TABLET = 780;
export const WIDTH_DESKTOP = 1100;
export const WIDTH_WIDEST = 1550;

export const HEADER_HEIGHT = 5;
export const HEADER_HEIGHT_MOBILE = 5;

/**
 * Font colors
 */
export const FONT_COLOR_NORMAL = "#222";
export const FONT_COLOR_SECONDARY = "#444";
export const FONT_COLOR_LIGHT = "rgba(0,0,0,0.5)";
export const FONT_COLOR_LIGHTEST = "rgba(0,0,0,0.3)";
export const FONT_COLOR_SUPER_LIGHT = "rgba(0,0,0,0.08)";

// export const COLOR_PRIMARY_DARK = "rgba(117, 165, 37, 1.000)";
// export const COLOR_PRIMARY_NORMAL = "rgb(90 180 149);";
// export const COLOR_PRIMARY_LIGHT = "rgba(151, 198, 74, 0.7)";
// export const COLOR_PRIMARY_LIGHTEST = "rgba(151, 198, 74, 0.3)";

export const COLOR_PRIMARY_0 = "#048a81";
export const COLOR_PRIMARY_1 = "#26B5ACff";
export const COLOR_PRIMARY_2 = "#47C1B9ff";
export const COLOR_PRIMARY_3 = "#69CDC7ff";
export const COLOR_PRIMARY_4 = "#8AD9D4ff";
export const COLOR_PRIMARY_5 = "#ABE5E2ff";
export const COLOR_PRIMARY_6 = "#CCF1EFff";

export const COLOR_ERROR_0 = "#D96394ff";
export const COLOR_ERROR_1 = "#DD77A1ff";
export const COLOR_ERROR_2 = "#E18BAFff";
export const COLOR_ERROR_3 = "#E59FBCff";
export const COLOR_ERROR_4 = "#E8B3C9ff";
export const COLOR_ERROR_5 = "#ECC7D7ff";
export const COLOR_ERROR_6 = "#f9ecf2";

export const COLOR_BLUE_0 = "#067CC1ff";
export const COLOR_BLUE_1 = "#288EC9ff";
export const COLOR_BLUE_2 = "#499FD2ff";
export const COLOR_BLUE_3 = "#6BB1DAff";
export const COLOR_BLUE_4 = "#8DC3E2ff";
export const COLOR_BLUE_5 = "#AED4EBff";
export const COLOR_BLUE_6 = "#D0E6F3ff";

export const COLOR_ORANGE_0 = "#F0C22Aff";
export const COLOR_ORANGE_1 = "#f5ce4d";
export const COLOR_ORANGE_2 = "#F5D260ff";
export const COLOR_ORANGE_3 = "#F8DB7Bff";
export const COLOR_ORANGE_4 = "#FAE396ff";
export const COLOR_ORANGE_5 = "#FDEBB1ff";
export const COLOR_ORANGE_6 = "#FFF3CCff";

export const COLOR_RED_0 = "#F55A5Aff";
export const COLOR_RED_1 = "#F77272ff";
export const COLOR_RED_2 = "#F88A8Aff";
export const COLOR_RED_3 = "#FAA2A2ff";
export const COLOR_RED_4 = "#FCBABAff";
export const COLOR_RED_5 = "#FDD2D2ff";
export const COLOR_RED_6 = "#FFEAEAff";

/**
 * Shadow
 */
export const SHADOW_0 = "0 1px 3px rgba(0,0,0,.03), 0 1px 2px rgba(0,0,0,.08);";

export const SHADOW_1 = "0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);";
export const SHADOW_2 = "0 3px 6px rgba(0,0,0,.15), 0 2px 4px rgba(0,0,0,.12);";
export const SHADOW_3 =
  "0 10px 20px rgba(0,0,0,.07), 0 3px 6px rgba(0,0,0,.05);";
export const SHADOW_4 =
  "0 15px 25px rgba(0,0,0,.07), 0 5px 10px rgba(0,0,0,.05);";
export const SHADOW_5 = "0 20px 40px rgba(0,0,0,.2);";

/**
 * Cookie
 */
export const COOKIE_ACCESS_TOKEN = "access_token";

/**
 * API STATUS
 */
export const API_IDLE = "idle";
export const API_LOADING = "loading";
export const API_SUCCEEDED = "succeeded";
export const API_FALIED = "failed";

/**
 * Layout
 */

export const CONTAINER_WIDTH_WIDE = "1459px";
export const CONTAINER_WIDTH_NORMAL = "1280px";
export const CONTAINER_WIDTH_NARROW = "1120px";
export const CONTAINER_WIDTH_SO_NARROW = "880px";

/**
 * Modals
 */
export const MODAL_LOGIN = "login";
export const MODAL_USER_INFO = "user";

/**
 * Notificatoin Type
 */
export const NOTIFICATION_INFO = "info";
export const NOTIFICATION_SUCCEED = "succeed";
export const NOTIFICATION_ERROR = "error";

/**
 * URLs
 */

export const LOCATION_LINK_PLACE_ID =
  "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=";
export const LOCATION_LINK_LATLNG = "https://www.google.com/maps/?q=";

/**
 * Type of place
 */

export const PLACE_TYPE_CAFE = "Cafe";
export const PLACE_TYPE_WORKSPACE = "Work Space";
export const PLACE_TYPE_PUBLIC = "Public Space";
export const PLACE_TYPE_HOTEL = "Hotel";
export const PLACE_TYPE_OTHER = "Other";
export const PLACE_TYPE_LIST: any = {
  [PLACE_TYPE_CAFE]: { text: "Cafe", icon: "☕" },
  [PLACE_TYPE_WORKSPACE]: { text: "Work Space", icon: "🖥️" },
  [PLACE_TYPE_PUBLIC]: { text: "Public Space", icon: "🏛️" },
  [PLACE_TYPE_HOTEL]: { text: "Hotel", icon: "🛏️" },
  [PLACE_TYPE_OTHER]: { text: "Other", icon: "🌐" },
};

/**
 * Availability
 */

// cafe
export const AVL_POWER_SOCKET = "power_socket";
export const AVL_SINGLE_ORIGIN = "single_origin";
export const AVL_FOOD_MENU = "food";
// Coworking
export const AVL_DROP_IN = "drop_in";
export const AVL_RENTAL_MONITOR = "monitor";
export const AVL_LIST_WORKSPACE = [AVL_POWER_SOCKET, AVL_RENTAL_MONITOR];
// public space
export const AVL_OPEN_AIR = "open_air";
export const AVL_INDOOR = "indoor";
// hotel
export const AVL_WORKSPACE = "work_space";
export const AVL_LIST_HOTEL = [AVL_WORKSPACE];

export const AVL_CAFE_LIST: any = {
  [AVL_POWER_SOCKET]: { text: "Power Socket", icon: "🔌" },
  [AVL_FOOD_MENU]: { text: "Food Menu", icon: "🍝" },
};

export const AVL_WORKSPACE_LIST: any = {
  [AVL_DROP_IN]: { text: "Drop-In Available", icon: "🚪" },
  [AVL_RENTAL_MONITOR]: { text: "Rental Monitor", icon: "🖥" },
};

export const AVL_PUBLICSPACE_LIST: any = {
  [AVL_OPEN_AIR]: { text: "Open Air Space", icon: "🍀" },
  [AVL_INDOOR]: { text: "Indoor Space", icon: "🏠" },
};

export const AVL_HOTEL_LIST: any = {
  [AVL_WORKSPACE]: { text: "Has Coworking Space", icon: "💻" },
};

export const AVL_ALL_LIST: any = {
  ...AVL_CAFE_LIST,
  ...AVL_WORKSPACE_LIST,
  ...AVL_PUBLICSPACE_LIST,
  ...AVL_HOTEL_LIST,
};

export const AVL_OTHER_LIST: any = {};

/**
 * Others
 */

export const OTHERS_SAVED = "Saved";
export const OTHERS_LIST: any = {
  [OTHERS_SAVED]: { text: "Saved", icon: "🏷️" },
};

/**
 * Sort
 */

export const SORT_BY_DISTANCE = "distance";
export const SORT_BY_REVIEW = "review";
export const SORT_BY_SPEED = "speed";
export const SORT_BY_CHECK_INS = "check-ins";

export const SORT_LIST: any = {
  [SORT_BY_REVIEW]: { text: "⭐️ Review Stars" },
  [SORT_BY_DISTANCE]: { text: "🧭 Distance" },
  [SORT_BY_SPEED]: { text: "🌐 Internet Speed" },
  [SORT_BY_CHECK_INS]: { text: "✅ Check-in Count" },
};

/**
 * Place Status
 */

export const STATUS_OPEN = "Open";
export const STATUS_TEMP_CLOSE = "Temporary Closed";
export const STATUS_PERM_CLOSE = "Parmanently Closed";

export const STATUS_LIST: any = {
  [STATUS_OPEN]: { text: "🟢 Open" },
  [STATUS_TEMP_CLOSE]: { text: "🟡 Temporary Closed" },
  [STATUS_PERM_CLOSE]: { text: "🔴 Parmanently Closed" },
};

/**
 * Point Rules
 */

export const POINT_TYPE_CHECK_IN = "Check In";
export const POINT_TYPE_FIRST_CHECK_IN = "First Check In";
export const POINT_TYPE_BE_CHECKED_IN = "Checked In";
export const POINT_TYPE_ADD_PLACE = "Add Place";
export const POINT_TYPE_REVIEW = "Review";

export const POINT_TABLE: {
  type: string;
  point: number;
  description: string;
}[] = [
  { type: POINT_TYPE_ADD_PLACE, point: 3, description: "Add place" },
  { type: POINT_TYPE_FIRST_CHECK_IN, point: 10, description: "First check in" },
  { type: POINT_TYPE_CHECK_IN, point: 3, description: "Check in" },
  {
    type: POINT_TYPE_BE_CHECKED_IN,
    point: 1,
    description: "Your place be checked in",
  },
  { type: POINT_TYPE_REVIEW, point: 10, description: "Post a review" },
];

export const getPointPlan = (pointType: string): number => {
  const plan = POINT_TABLE.find((item) => item.type === pointType);
  return plan ? plan.point : 0;
};

/**
 * Notification  Types
 */
export const NOTIFY_TYPE_UPV_REVIEW = "upvote_review";
export const NOTIFY_TYPE_BE_CHECKED_IN = "checked_in";

/**
 * Paths
 */

export const PATH_HOME = "/";
export const PATH_MAP = "/map";
export const PATH_SIGNUP = "/signup";
export const PATH_ARTICLES = "/articles";
export const PATH_CITIES = "/cities";
export const PATH_NEW_PLACE = "/new-place";

/**
 * Event name
 */

export const EVENT_GOOGLE_CLICK = "click_google_map_link";
export const EVENT_SIGNUP = "signup_succeed";
export const EVENT_CHECKIN = "checkin";
export const EVENT_SUBMIT_PLACE = "submit_place";
