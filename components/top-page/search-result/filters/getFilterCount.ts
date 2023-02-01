import { SORT_BY_REVIEW } from "../../../../constants";
import { FilterObj } from "./../../../../redux/slices/placeSlice";

export const getFilterCount = (filterObj: FilterObj) => {
  let filterCnt = 0;

  if (filterObj.placeTypes.length > 0) filterCnt += 1;
  if (filterObj.availability.length > 0) filterCnt += 1;
  if (filterObj.saved) filterCnt += 1;
  if (filterObj.sortBy !== SORT_BY_REVIEW) filterCnt += 1;

  return filterCnt;
};
