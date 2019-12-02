const Sequelize = require("sequelize");
const { db } = require("../db.js");
const { INTEGER, STRING, UUID, UUIDV4 } = Sequelize;

const CalDate = db.define("calDate", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  year: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  month: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  day: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  dayOfYear: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  weekDayNum: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  weekDayName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  monthName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = CalDate;
