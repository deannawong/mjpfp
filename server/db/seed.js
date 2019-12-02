const chalk = require("chalk");
const { db, models } = require("./index.js");
const moment = require("moment");

const { CalDate, Task } = models;

const TOTAL_DAYS = 7670;

const generateSingleDay = (start, daysFromStart) => {
  //start is string that will start the cal on a year, month,day
  //daysFromStart is a number
  const weekDayStrings = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];

  const monthNameStrings = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const year = moment()
    .subtract(9, "years")
    .startOf(start)
    .add(daysFromStart, "days")
    .year();
  const month =
    moment()
      .subtract(9, "years")
      .startOf(start)
      .add(daysFromStart, "days")
      .month() + 1;
  const day = moment()
    .subtract(9, "years")
    .startOf(start)
    .add(daysFromStart, "days")
    .date();
  const dayOfYear = moment()
    .subtract(9, "years")
    .startOf(start)
    .add(daysFromStart, "days")
    .dayOfYear();
  const weekDayNum = moment()
    .subtract(9, "years")
    .startOf(start)
    .add(daysFromStart, "days")
    .weekday();

  const weekDayName = weekDayStrings[weekDayNum];
  const monthName = monthNameStrings[month - 1];

  return { year, month, day, dayOfYear, weekDayNum, weekDayName, monthName };
};

const generateDays = (start, numDays) => {
  return Array(numDays)
    .fill("")
    .map((arg, idx) => generateSingleDay(start, idx));
};

const createDates = numDays => {
  const allDays = generateDays("year", numDays);
  return CalDate.bulkCreate(allDays);
};

//generate days

const seed = daysShowing => {
  db.sync({ force: true })
    .then(() => {
      console.log(chalk.yellow("starting seed~~"));
      return createDates(daysShowing);
    })
    .then(() => {
      console.log(chalk.greenBright("seeding complete!"));
      db.close();
    })
    .catch(e => {
      console.error(chalk.red("seeding error"), e);
      db.close;
    });
};

seed(TOTAL_DAYS);
