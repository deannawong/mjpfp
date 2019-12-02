const Sequelize = require("sequelize");
const { db } = require("../db.js");
const { STRING, UUID, UUIDV4, BOOLEAN } = Sequelize;

const Task = db.define("task", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  description: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  completed: {
    type: BOOLEAN
  }
});

module.exports = Task;
