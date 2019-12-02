export const updateAllDates = updatedDates => ({
  type: "UPDATE_ALL_DATES",
  payload: updatedDates
});

export const newOffset = offset => ({
  type: "UPDATE_OFFSET",
  payload: offset
});

export const newMonth = monthString => ({
  type: "UPDATE_CURRENT_MONTH_NAME",
  payload: monthString
});
export const updateMonth = newMonth => ({
  type: "UPDATE_MONTH",
  payload: newMonth
});
export const updateYear = newYear => ({
  type: "UPDATE_YEAR",
  payload: newYear
});
