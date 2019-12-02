import {
  updateAllDates,
  newOffset,
  newMonth,
  updateMonth,
  updateYear
} from "./Redux/Actions";
import Axios from "Axios";
import store from "./Redux/Store";

const fetchCalDates = (year, month) => {
  Axios.get(`/api/dates/${year}/${month}`)
    .then(response => response.data)
    .then(data => {
      store.dispatch(updateAllDates(data));
      updateOffset();
      updateMonthName();
    });
};

const updateOffset = () => {
  const offset = store.getState().calDates[0].weekDayNum;
  store.dispatch(newOffset(offset));
};

const updateMonthName = () => {
  const monthString = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  store.dispatch(newMonth(monthString[store.getState().viewMonth - 1]));
};
const previousMonth = () => {
  if (store.getState().viewMonth > 1) {
    store.dispatch(updateMonth(store.getState().viewMonth - 1));
  } else {
    store.dispatch(updateMonth(12));
    store.dispatch(updateYear(store.getState().viewYear - 1));
  }

  fetchCalDates(store.getState().viewYear, store.getState().viewMonth);
};

const nextMonth = () => {
  if (store.getState().viewMonth < 12) {
    store.dispatch(updateMonth(store.getState().viewMonth + 1));
  } else {
    store.dispatch(updateMonth(1));
    store.dispatch(updateYear(store.getState().viewYear + 1));
  }

  fetchCalDates(store.getState().viewYear, store.getState().viewMonth);
};
const findToday = () => {
  store.dispatch(updateMonth(store.getState().currentMonth));
  store.dispatch(updateYear(store.getState().currentYear));
  fetchCalDates(store.getState().viewYear, store.getState().viewMonth);
};

export {
  fetchCalDates,
  updateOffset,
  updateMonthName,
  previousMonth,
  nextMonth,
  findToday
};
