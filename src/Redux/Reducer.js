const nowNow = new Date();

const initialState = {
  currentYear: nowNow.getFullYear(),
  currentMonth: nowNow.getMonth() + 1,
  currentDay: nowNow.getDate(),
  calDates: [],
  offset: 0,
  viewYear: nowNow.getFullYear(),
  viewMonth: nowNow.getMonth() + 1,
  viewMonthName: "",
  currTask: ""
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ALL_DATES":
      return { ...state, calDates: action.payload };
    case "UPDATE_OFFSET":
      return { ...state, offset: action.payload };
    case "UPDATE_CURRENT_MONTH_NAME":
      return { ...state, viewMonthName: action.payload };
    case "UPDATE_MONTH":
      return { ...state, viewMonth: action.payload };
    case "UPDATE_YEAR":
      return { ...state, viewYear: action.payload };
  }
};

export { initialState, rootReducer };
