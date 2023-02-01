import * as cons from "../constants";

const ONE_HOUR_IN_MS = 1000 * 60 * 60;
const ONE_DAY_IN_MS = ONE_HOUR_IN_MS * 24;
const ONE_WEEK_IN_MS = ONE_DAY_IN_MS * 7;
const ONE_MONTH_IN_MS = ONE_DAY_IN_MS * 30;
const ONE_YEAR_IN_MS = ONE_DAY_IN_MS * 365;

const addZero = (number: number): string => {
  if (number < 10) return `0${number}`;
  return number.toString();
};

export const convertMonthToString = (monthNumber: number): string => {
  switch (monthNumber) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      return "Jan";
  }
};

const convertDayToString = (dateNum: number): string => {
  switch (dateNum) {
    case 1:
    case 21:
    case 31:
      return `${dateNum}st`;
    case 2:
    case 22:
      return `${dateNum}nd`;
    case 3:
    case 23:
      return `${dateNum}rd`;
    default:
      return `${dateNum}th`;
  }
};

export const convertDateToDateStr = (dateObj: Date) => {
  try {
    // yyyy-m-d
    const year = dateObj.getFullYear();
    const month = addZero(dateObj.getMonth() + 1);
    const date = addZero(dateObj.getDate());
    return `${year}-${month}-${date}`;
  } catch (err) {
    return "";
  }
};

export const generateTimeString = (timestampStr: string) => {
  if (!timestampStr) return "";
  const timestamp = parseInt(timestampStr, 10);
  const days = Math.floor(timestamp / ONE_DAY_IN_MS);
  const hoursInTS = timestamp - days * ONE_DAY_IN_MS;
  const hours = Math.floor(hoursInTS / (ONE_DAY_IN_MS / 24));

  const timeString = `${
    days > 0 ? `${days} day${days === 1 ? "" : "s"} ` : ""
  }${hours} hour${hours > 1 ? "s" : ""}`;

  return timeString;
};

export const generateTimeStringYearMonthDay = (timestampStr: string) => {
  if (!timestampStr) return "";
  const timestamp = parseInt(timestampStr, 10);
  const years = Math.floor(timestamp / (ONE_DAY_IN_MS * 365));
  const monthsInTS = timestamp - years * (ONE_DAY_IN_MS * 365);
  const months = Math.floor(monthsInTS / (ONE_DAY_IN_MS * 30));
  const daysInTS = monthsInTS - months * (ONE_DAY_IN_MS * 30);
  const days = Math.floor(daysInTS / ONE_DAY_IN_MS);

  if (years > 0) return `${years} year${years === 1 ? "" : "s"}`;
  if (months > 0) return `${months} month${months === 1 ? "" : "s"}`;
  return `${days} day${days === 1 ? "" : "s"}`;
};

export const convertHourUtcToLocal = (
  utcHour: number,
  reverse: boolean = false
) => {
  const offset = new Date().getTimezoneOffset() / 60;
  const localHour = reverse ? utcHour + offset : utcHour - offset;
  if (localHour < 0) {
    return 24 + localHour;
  }
  if (localHour > 23) {
    return localHour - 24;
  }
  return localHour;
};

const isValidDate = (d: Date) => {
  return d instanceof Date;
};

export const convertStringToDate = (dateStr: string): Date | null => {
  const dateObj = new Date(dateStr);
  if (isValidDate(dateObj)) {
    return dateObj;
  } else {
    return null;
  }
};

export const convertDateToString = (dateObj: Date): string => {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  return `${month}/${date}/${year}`;
};

export const generateDayDiffStr = (fromDate: Date, toDate: Date) => {
  const diffTS = toDate.getTime() - fromDate.getTime();
  const diffInDays = Math.ceil(diffTS / ONE_DAY_IN_MS);

  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
  }

  const diffInMonth = Math.floor(diffInDays / 30);

  if (diffInMonth < 12) {
    return `${diffInMonth} month${diffInMonth > 1 ? "s" : ""} `;
  }

  const diffInYear = Math.floor(diffInMonth / 12);

  return `${diffInYear} year${diffInYear > 1 ? "s" : ""} `;
};

export const generateDateText = (date: Date): string => {
  const dayNum = date.getDate();
  const monthNum = date.getMonth();
  const yearNum = date.getFullYear();
  const dayStr = convertDayToString(dayNum);
  const monthStr = convertMonthToString(monthNum);
  const yearStr = yearNum.toString();
  return `${dayStr} ${monthStr} ${yearStr}`;
};

// export const numerifyWeekString = (week: string): number => {
//   switch (week) {
//     case cons.WK_MON:
//       return 1;
//     case cons.WK_TUE:
//       return 2;
//     case cons.WK_WED:
//       return 3;
//     case cons.WK_THU:
//       return 4;
//     case cons.WK_FRI:
//       return 5;
//     case cons.WK_SAT:
//       return 6;
//     case cons.WK_SUN:
//       return 0;
//     default:
//       return 0;
//   }
// };

export const removeTimeFromDateObj = (dateObj: Date): Date | null => {
  const dateString = convertDateToString(dateObj);
  const dateWithoutTime = convertStringToDate(dateString);
  return dateWithoutTime;
};

export const generateDate = (datePlus: number): Date | null => {
  const thisDate = new Date();
  thisDate.setDate(thisDate.getDate() + datePlus);
  const thisDatePure = removeTimeFromDateObj(thisDate);
  if (!thisDatePure) return null;
  return thisDatePure;
};

// export const weekStringifyShort = (weekOfDay: number) => {
//   switch (weekOfDay) {
//     case 0:
//       return cons.WK_SUN;
//     case 1:
//       return cons.WK_MON;
//     case 2:
//       return cons.WK_TUE;
//     case 3:
//       return cons.WK_WED;
//     case 4:
//       return cons.WK_THU;
//     case 5:
//       return cons.WK_FRI;
//     case 6:
//       return cons.WK_SAT;
//     default:
//       return cons.WK_SUN;
//   }
// };

export const convertDateStrToReadableDateStr = (dateStr: string): string => {
  const yearDigit = dateStr.slice(0, 4);
  const monthDigit = dateStr.slice(4, 6);
  const dateDigit = dateStr.slice(6, 8);

  const yearStr = yearDigit;
  const monthStr = convertMonthToString(parseInt(monthDigit, 10) - 1);
  const dayStr = convertDayToString(parseInt(dateDigit, 10));

  return `${dayStr} ${monthStr} ${yearStr}`;
};

export const convertDateStrToReadable = (dateStr: string): string => {
  try {
    let dateText = "";
    let timeText = "";

    const [yearMonthDay, hourMinSec] = dateStr.split(".");
    if (!yearMonthDay) return "";

    const [year, month, day] = yearMonthDay.split("-");
    dateText = `${convertDayToString(parseInt(day))} ${convertMonthToString(
      parseInt(month)
    )} ${year}`;

    if (hourMinSec) {
      timeText = hourMinSec;
    }

    return `${dateText}`;
  } catch (err) {
    return "";
  }
};

export const convertTimestampToTimeAgo = (timestamp: number): string => {
  try {
    // if within 24 hours
    const diffTS = Date.now() - timestamp;

    if (diffTS > ONE_YEAR_IN_MS)
      return `${Math.floor(diffTS / ONE_YEAR_IN_MS)}y`;

    if (diffTS > ONE_MONTH_IN_MS)
      return `${Math.floor(diffTS / ONE_MONTH_IN_MS)}m`;

    if (diffTS > ONE_WEEK_IN_MS)
      return `${Math.floor(diffTS / ONE_WEEK_IN_MS)}w`;

    if (diffTS > ONE_DAY_IN_MS) return `${Math.floor(diffTS / ONE_DAY_IN_MS)}d`;

    return `today`;
  } catch (err) {
    return "";
  }
};

export const toMonthDate = (date: Date): string => {
  const month = date.getMonth();
  const day = date.getDate();
  return `${convertMonthToString(month)} ${day}`;
};
